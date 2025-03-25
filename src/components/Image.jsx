import React from "react";
import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
import { useGlobalContext } from "./../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useFireStore } from "../hooks/useFireStore";
import { toast } from "react-toastify";
function Image({ image, pending, added, isDownloadedPage }) {
  const {
    likedImages,
    downloadImages,
    dispatch,
    user: authUser,
  } = useGlobalContext();
  const { addDocument, deleteDocument } = useFireStore();
  const { links, urls, alt_description, user } = image;
  const addLikedImage = (image, e) => {
    e.preventDefault();

    if (!authUser.emailVerified) {
      return toast.info("Please, verify your email, Go to Profile page");
    }

    const alreadyAdded = likedImages.some((img) => {
      return img.id == image.id;
    });

    if (!alreadyAdded) {
      addDocument("likedImages", image.id, image);
    } else {
      deleteDocument("likedImages", image.id);
    }
  };
  const downloadImage = (e) => {
    e.preventDefault();
    if (!authUser.emailVerified) {
      return toast.info("Please, verify your email, Go to Profile page");
    }
    const isDownloaded = downloadImages.some((img) => img.id === image.id);

    if (!isDownloaded) {
      setTimeout(() => {
        if (window.confirm("Bu rasmni yuklab olmoqchimisiz?")) {
          window.open(links.download + "&force=true", "_blank");
          dispatch({ type: "DOWNLOAD", payload: image });
        }
      }, 50);
    } else {
      alert("Bu rasm allaqachon yuklab olingan!");
    }
  };

  function handleDeleteImage(id, e) {
    e.preventDefault();

    dispatch({ type: "REMOVE_DOWNLOADED_IMAGE", payload: id });
  }

  return (
    <Link to={`/imageInfo/${image.id}`}>
      <div className="group relative block cursor-pointer overflow-hidden select-none">
        {!added && (
          <span
            onClick={(e) => {
              addLikedImage(image, e);
            }}
            className="hover-icons top-2 right-2 z-50 h-7 w-7 justify-center border border-white"
          >
            <FaRegHeart className="text-white" />
          </span>
        )}
        {added && (
          <span
            onClick={(e) => {
              addLikedImage(image, e);
            }}
            className="hover-icons top-2 right-2 z-50 h-7 w-7 justify-center border border-white bg-white"
          >
            <FaHeart className="text-red-600" />
          </span>
        )}
        <img
          src={urls.regular}
          alt={alt_description}
          className="skeleton w-full rounded-md"
        />
        <div className="absolute inset-0 rounded-md bg-black opacity-0 transition-opacity duration-400 group-hover:opacity-30"></div>
        <span className="hover-icons bottom-2 left-2 flex items-center gap-2">
          <img
            className="h-5 w-5 rounded-full md:h-8 md:w-8"
            src={user.profile_image.large}
            alt={user.name + " avatar"}
          />
          <p className="text-xs text-white md:text-sm">{user.name}</p>
        </span>
        <span
          onClick={(e) => downloadImage(e)}
          className="hover-icons right-2 bottom-2 h-7 w-7 justify-center border border-white"
        >
          <span>
            <FaDownload className="h-4 w-4 text-white" />
          </span>
        </span>
        {isDownloadedPage && (
          <span
            onClick={(e) => handleDeleteImage(image.id, e)}
            className="hover-icons top-2 left-2 h-7 w-7 justify-center"
          >
            <span>
              <MdDelete className="h-6 w-6 text-white transition duration-200 hover:text-red-600" />
            </span>
          </span>
        )}
        {pending && (
          <div className="skeleton absolute inset-0 rounded-md"></div>
        )}
      </div>
    </Link>
  );
}

export default Image;
