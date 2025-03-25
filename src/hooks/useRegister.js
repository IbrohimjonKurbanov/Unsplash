import { auth } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useGlobalContext } from "./useGlobalContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useRegister = () => {
  const { dispatch, user } = useGlobalContext();
  const navigate = useNavigate();

  const saveUser = (user) => {
    localStorage.setItem("current-user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
  };

  const registerWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      saveUser(result.user);
      toast.success(`Welcome, ${result.user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerWithEmail = (displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
        });
        saveUser(user);

        toast.success(`Welcome, ${displayName}`);
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return { registerWithGoogle, registerWithEmail };
};
