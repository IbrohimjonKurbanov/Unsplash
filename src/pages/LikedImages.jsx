import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import ImageContainer from "./../components/ImageContainer";
import { Link } from "react-router-dom";

function LikedImages() {
  const { likedImages, dispatch } = useGlobalContext();

  function handleDelete() {
    if (confirm("Are you sure you want to delete all pictures?"))
      dispatch({ type: "CLEAR_LIKED_IMAGES" });
  }
  if (likedImages.length === 0) {
    return (
      <div className="h-full flex justify-center flex-col items-center gap-10">
        <h1 className="text-center text-2xl md:text-4xl  ">
          You haven't chosen any images yet!
        </h1>
        <Link to="/" className="btn btn-primary btn-sm md:btn-md">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="align-elements my-10">
      {likedImages.length > 0 && (
        <button onClick={handleDelete} className="btn btn-primary btn-lg mb-10">
          Delete all pictures
        </button>
      )}

      {likedImages.length > 0 && <ImageContainer images={likedImages} />}
    </div>
  );
}

export default LikedImages;
