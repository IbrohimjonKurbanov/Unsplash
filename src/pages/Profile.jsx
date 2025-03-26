import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { toast } from "react-toastify";
import { useManageUser } from "../hooks/useManageUser";
function Profile() {
  const { user, dispatch } = useGlobalContext();
  const { sendVerification, changeUserPassword, deleteUserAccount } =
    useManageUser();

  const [imageBase64, setImageBase64] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const saveImage = localStorage.getItem(`profile-image-${user.uid}`);
    if (saveImage) {
      setImageBase64(saveImage);
    }
  }, [user.uid]);

  const imageChangeBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file && file.size / 1024 < 1024) {
      reader.onloadend = () => {
        setTempImage(reader.result);
        setShowButtons(true);
      };
      reader.readAsDataURL(file);
    } else {
      toast.warn("Oops! The image must be less than 1MB");
    }
  };

  const cancelImageSave = () => {
    setTempImage(null);
    setShowButtons(false);
  };

  const saveImage = () => {
    if (!tempImage) return;

    localStorage.setItem(`profile-image-${user.uid}`, tempImage);
    dispatch({ type: "UPDATE_PROFILE_IMAGE", payload: tempImage });
    setImageBase64(tempImage);
    setTempImage(null);
    setShowButtons(false);
    toast.success("Profile image saved!");
  };

  const handleChangePassword = () => {
    const currentPassword = prompt("Enter your current password:");
    if (!currentPassword) return;

    const newPassword = prompt("Enter your new password:");
    if (!newPassword) return;

    changeUserPassword(currentPassword, newPassword);
  };

  const handleDeleteAccount = () => {
    const currentPassword = prompt("Enter your current password:");
    if (!currentPassword) return;

    if (confirm("Are you sure you want to delete your account? ")) {
      deleteUserAccount(currentPassword);
    }
  };

  return (
    <div className="align-elements py-10">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col items-center justify-center">
          <img
            src={tempImage || imageBase64 || user.photoURL || "User Photo"}
            alt={user.displayName + " avatar"}
            className="mb-5 h-40 w-40 rounded-full object-cover md:h-40 md:w-40"
          />

          {!showButtons && (
            <input
              onChange={imageChangeBase64}
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
              className="file-input file-input-primary file-input-sm"
            />
          )}

          {showButtons && (
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
        <div className="mt-5 flex w-full flex-col gap-3 md:w-auto">
          <button
            onClick={handleChangePassword}
            className="btn w-full bg-yellow-500 text-white hover:bg-yellow-600 md:w-60"
          >
            Change Password
          </button>
          <button
            onClick={handleDeleteAccount}
            className="btn w-full bg-red-500 text-white hover:bg-red-600 md:w-60"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
