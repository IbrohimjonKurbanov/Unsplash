import { useGlobalContext } from "./useGlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
export const useLogout = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      toast.success("See you soon");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return { logout };
};
