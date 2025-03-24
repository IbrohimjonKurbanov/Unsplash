import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./useGlobalContext";
import { toast } from "react-toastify";

export function useLogin() {
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      localStorage.setItem("current-user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
      toast.success(`Welcome back, ${user.displayName} `);
    } catch (error) {
      console.log(error);
      toast.error("Email or Password is incorrect !");
    }
  };

  return { loginWithEmail };
}
