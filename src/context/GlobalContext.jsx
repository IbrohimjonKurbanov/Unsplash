import { createContext, useEffect, useReducer } from "react";
import { useCollection } from "../hooks/useCollection";

export const GlobalContext = createContext();

const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("current-user"));
  return user
    ? JSON.parse(localStorage.getItem(`user-${user.uid}`)) || {
        user,
        likedImages: [],
        downloadImages: [],
      }
    : { user: null, likedImages: [], downloadImages: [] };
};

const saveUserData = (state) => {
  if (state.user) {
    localStorage.setItem("current-user", JSON.stringify(state.user));
    localStorage.setItem(`user-${state.user.uid}`, JSON.stringify(state));
  }
};

const changeState = (state, action) => {
  let newState = state;

  switch (action.type) {
    case "LOGIN":
      newState = { ...getUserData(), user: action.payload };
      break;
    case "LOGOUT":
      newState = { user: null, likedImages: [], downloadImages: [] };
      localStorage.removeItem("current-user");
      break;
    case "LIKE":
      newState = {
        ...state,
        likedImages: action.payload,
      };
      break;
    case "CLEAR_LIKED_IMAGES":
      newState = { ...state, likedImages: [] };
      break;
    case "DOWNLOAD":
      newState = {
        ...state,
        downloadImages: [...state.downloadImages, action.payload],
      };
      break;
    case "REMOVE_DOWNLOADED_IMAGE":
      newState = {
        ...state,
        downloadImages: state.downloadImages.filter(
          (img) => img.id !== action.payload,
        ),
      };
      break;
    case "CLEAR_DOWNLOADED_IMAGES":
      newState = { ...state, downloadImages: [] };
      break;
    default:
      return state;
  }

  saveUserData(newState);
  return newState;
};

export function GlobalContextProvider({ children }) {
  const { data: likedImages } = useCollection("likedImages");
  const [state, dispatch] = useReducer(changeState, getUserData());

  useEffect(() => saveUserData(state), [state]);

  useEffect(() => {
    if (likedImages) dispatch({ type: "LIKE", payload: likedImages });
  }, [likedImages]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
