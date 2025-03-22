import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

// const dataFromLocalStorage = () => {
//   return (
//     JSON.parse(localStorage.getItem("my-splash-data")) || {
//       likedImages: [],
//       downloadImages: [],
//     }
//   );
// };
// const initialState = {
//   likedImages: [],
//   downloadImages: [],
//   ...dataFromLocalStorage(),
// };

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "LIKE":
      return {
        ...state,
        likedImages: [...state.likedImages, payload],
      };
    case "UNLIKE":
      return {
        ...state,
        likedImages: state.likedImages.filter((image) => image.id !== payload),
      };
    case "CLEAR_LIKED_IMAGES":
      return {
        ...state,
        likedImages: [],
      };
    case "DOWNLOAD":
      return {
        ...state,
        downloadImages: [...state.downloadImages, payload],
      };
    case "CLEAR_DOWNLOADED_IMAGES":
      return { ...state, downloadImages: [] };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    likedImages: [],
    downloadImages: [],
  });
  useEffect(() => {
    localStorage.setItem("my-splash-data", JSON.stringify(state));
  }, [state]);
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
