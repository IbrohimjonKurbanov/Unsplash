import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useGlobalContext();

  const sendVerification = () => {
    sendEmailVerification(auth.currentUser, {
      url: "http://localhost:5173/profile",
    }).then(() => {
      toast.success("Verification email is sended !");
    });
  };

  return (
    <div className="align-elements py-10">
      <div className="flex gap-5">
        <div>
          <img
            src={user.photoURL || "User Photo"}
            alt={user.displayName + "avatar "}
            className="h-40 w-40 rounded-full"
          />
        </div>
        <div className="bg-base-200 grid grow grid-cols-1 gap-5 rounded-lg p-5 md:grid-cols-2">
          <h2>
            <span className="block font-medium">Display Name:</span>
            <span> {user.displayName}</span>
          </h2>
          <h2>
            <span className="block font-medium">Status User:</span>
            <span>
              {user.emailVerified ? (
                "Verified ✅"
              ) : (
                <span className="flex items-center gap-2">
                  <span>Not Verified ❌</span>
                  <button
                    onClick={sendVerification}
                    className="btn btn-xs btn-primary text-white"
                  >
                    Send
                  </button>
                </span>
              )}
            </span>
          </h2>
          <h2>
            <span className="block font-medium">Email:</span>
            <span> {user.email}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
