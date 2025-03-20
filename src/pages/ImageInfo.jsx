import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function ImageInfo() {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/photos/${id}?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`
  );

  return <div>ImageInfo</div>;
}

export default ImageInfo;
