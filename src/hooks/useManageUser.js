import {
  sendEmailVerification,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useManageUser() {
  const navigate = useNavigate();

  const reauthenticateUser = (password) => {
    return reauthenticateWithCredential(
      auth.currentUser,
      EmailAuthProvider.credential(auth.currentUser.email, password),
    )
      .then(() => true)
      .catch((error) => {
        toast.error(error.message);
        return false;
      });
  };

  const sendVerification = () => {
    sendEmailVerification(auth.currentUser, {
      url: "https://ik-unsplash.vercel.app/profile",
    })
      .then(() => {
        toast.success("Verification email is sent!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const changeUserPassword = async (currentPassword, newPassword) => {
    const isReauthenticated = await reauthenticateUser(currentPassword);
    if (!isReauthenticated) return;

    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        toast.success("Password updated!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const deleteUserAccount = async (password) => {
    const isReauthenticated = await reauthenticateUser(password);
    if (!isReauthenticated) return;

    deleteUser(auth.currentUser)
      .then(() => {
        toast.success("Account deleted");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return {
    sendVerification,
    changeUserPassword,
    deleteUserAccount,
  };
}
