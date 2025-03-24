import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function ImageInfo() {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/photos/${id}?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`,
  );
  console.log(data);

  if (!data || !data.urls) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <h1 className="text-center text-2xl md:text-4xl">Loading...</h1>
      </div>
    );
  }
  if (isPending) {
    <div className="flex h-full flex-col items-center justify-center gap-10">
      <h1 className="text-center text-2xl md:text-4xl">Loading...</h1>
    </div>;
  }
  return (
    <div className="flex h-full items-center">
      <div className="align-elements mt-10 md:mt-0">
        <div className="flex-col items-center gap-10 md:flex md:flex-row">
          <div>
            <img
              className="h-[300px] w-[500px] rounded-md object-cover md:h-[500px]"
              src={data.urls.regular}
              alt=""
            />
          </div>
          <div className="flex max-w-[550px] flex-col gap-2">
            <h2 className="mt-3 text-xl font-bold">{data.alt_description}</h2>
            <div className="mt-2 flex items-center gap-2">
              <img
                src={data.user.profile_image.large}
                alt={data.user.name}
                className="h-8 w-8 rounded-full"
              />
              <p>
                {data.user.name} (@{data.user.username})
              </p>
            </div>
            <p>
              📅 Yaratilgan sana:{" "}
              {new Date(data.created_at).toLocaleDateString()}
            </p>
            <p>📍 Joylashuv: {data.location?.name || "Noma’lum"}</p>
            <p>⬇️ Yuklab olinganlar: {data.downloads.toLocaleString()}</p>
            <p>❤️ Layklar: {data.likes}</p>
            <p>🆔 ID: {data.id}</p>
            <Link to="/" className="btn btn-primary btn-sm md:btn-md mb-5">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageInfo;
