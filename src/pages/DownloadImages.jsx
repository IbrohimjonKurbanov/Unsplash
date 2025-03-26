import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import ImageContainer from "../components/ImageContainer";
import { Link } from "react-router-dom";

function DownloadedImages() {
  const { downloadImages } = useGlobalContext();

  if (downloadImages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <h1 className="text-center text-2xl md:text-4xl">
          You haven't downloaded any images yet!
        </h1>
        <Link to="/" className="btn btn-primary btn-sm md:btn-md">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="align-elements my-10">
      {downloadImages.length > 0 && (
        <ImageContainer images={downloadImages} isDownloadedPage={true} />
      )}
    </div>
  );
}

export default DownloadedImages;
