import React, { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useGlobalContext();
  const [imageBase64, setImageBase64] = useState(null);
  const sendVerification = () => {
    sendEmailVerification(auth.currentUser, {
      url: "https://ik-unsplash.vercel.app/profile",
    }).then(() => {
      toast.success("Verification email is sended !");
    });
  };

  const imageChangeBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file.size / 1024 < 1024) {
      reader.addEventListener("load", () => {
        setImageBase64(reader.result);
      });
      reader.readAsDataURL(file);
    } else {
      toast.warn("Oops! The image must be Less than 1MB");
    }
  };
  const cancelImageSave = () => {
    setImageBase64(null);
  };

  const saveImage = () => {
    setImageBase64(imageBase64);
  };

  return (
    <div className="align-elements py-10">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col items-center justify-center">
          <img
            src={(imageBase64 ?? user.photoURL) || "User Photo"}
            alt={user.displayName + "avatar "}
            className="mb-5 h-40 w-40 rounded-full object-cover md:h-40 md:w-40"
          />

          {!imageBase64 && (
            <input
              onChange={imageChangeBase64}
              type="file"
              accept=".jpg,.jpeg,.png.,gif"
              className="file-input file-input-primary file-input-sm"
            />
          )}
          {imageBase64 && (
            <div className="flex w-full justify-center gap-1">
              <button
                onClick={cancelImageSave}
                className="btn btn-secondary btn-xs grow"
              >
                Cancel
              </button>
              <button
                onClick={saveImage}
                className="btn btn-primary btn-xs grow"
              >
                Save
              </button>
            </div>
          )}
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
