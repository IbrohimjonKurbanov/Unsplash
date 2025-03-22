import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Image } from "./";
import { useGlobalContext } from "../hooks/useGlobalContext";
function ImageContainer({ images, pending }) {
  const { likedImages } = useGlobalContext();
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
      <Masonry gutter="10px">
        {images.map((image) => {
          return (
            <div key={image.id} className="h-auto w-full">
              <Image
                key={image.id}
                image={image}
                pending={pending}
                added={likedImages.some((img) => img.id == image.id)}
              />
            </div>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default ImageContainer;
