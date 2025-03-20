import React from "react";
import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
import { useGlobalContext } from "./../hooks/useGlobalContext";
import { Link } from "react-router-dom";

function Image({ image, pending, added }) {
  const { likedImages, dispatch } = useGlobalContext();
  console.log(image);

  const { links, urls, alt_description, user } = image;

  function addLikedImage(image, e) {
    e.preventDefault();
    const alreadyAdded = likedImages.some((img) => {
      return img.id == image.id;
    });

    if (!alreadyAdded) {
      dispatch({ type: "LIKE", payload: image });
    } else {
      dispatch({ type: "UNLIKE", payload: image.id });
    }
  }
  const downloadImage = (e) => {
    e.preventDefault();
    window.open(links.download + "&force=true", "_blank");
  };
  return (
    <Link to={`/imageInfo/${image.id}`}>
      <div className="overflow-hidden relative group select-none block cursor-pointer">
        {!added && (
          <span
            onClick={(e) => {
              addLikedImage(image, e);
            }}
            className=" border-white  h-7 w-7 border  justify-center  right-2 top-2 hover-icons  z-50"
          >
            <FaRegHeart className="text-white " />
          </span>
        )}
        {added && (
          <span
            onClick={(e) => {
              addLikedImage(image, e);
            }}
            className="border-white bg-white  h-7 w-7 border  justify-center  right-2 top-2 hover-icons z-50"
          >
            <FaHeart className="text-red-600 " />
          </span>
        )}
        <img
          src={urls.regular}
          alt={alt_description}
          className="skeleton w-full  rounded-md  "
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-400 rounded-md"></div>
        <span className="left-2 bottom-2 flex items-center gap-2  hover-icons">
          <img
            className="w-5 h-5 md:w-8 md:h-8 rounded-full"
            src={user.profile_image.large}
            alt={user.name + " avatar"}
          />
          <p className="text-white text-xs md:text-sm">{user.name}</p>
        </span>
        <span className="h-7 w-7  border border-white justify-center  right-2 bottom-2 hover-icons">
          <span
            onClick={(e) => {
              downloadImage(e);
            }}
          >
            <FaDownload className="text-white w-4 h-4" />
          </span>
        </span>
        {pending && (
          <div className="absolute inset-0 skeleton rounded-md"></div>
        )}
      </div>
    </Link>
  );
}

export default Image;
