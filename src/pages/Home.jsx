import React, { useEffect, useRef, useState } from "react";
import { Search, ImageContainer } from "../components";
import { Link, useActionData } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

function Home() {
  const searchParamsFromAction = useActionData();
  const [allImages, setAllImages] = useState([]);
  const [pageParam, setPageParam] = useState(1);
  const [query, setQuery] = useState(searchParamsFromAction ?? "all");
  const prevSearchParam = useRef(searchParamsFromAction);

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }&query=${query.toLowerCase()}&page=${pageParam}`,
  );

  useEffect(() => {
    if (data && data.results) {
      setAllImages((prev) =>
        pageParam === 1 ? data.results : [...prev, ...data.results],
      );
    }
  }, [data]);

  useEffect(() => {
    if (searchParamsFromAction !== prevSearchParam.current) {
      setAllImages([]);
      setPageParam(1);
      setQuery(searchParamsFromAction ?? "all");
      prevSearchParam.current = searchParamsFromAction;
    }
  }, [searchParamsFromAction]);

  useEffect(() => {
    setAllImages([]);
    setPageParam(1);
  }, [query]);

  const themes = [
    "cars",
    "nature",
    "city",
    "something",
    "motivation",
    "cats",
    "animals",
    "technology",
    "Football",
  ];

  const handleRandom = () => {
    let randomQuery = themes[Math.floor(Math.random() * themes.length)];
    setQuery(randomQuery);
  };

  if (error) {
    return <h1>Error {error}</h1>;
  }
  if (!isPending && allImages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <h1 className="text-center text-2xl md:text-4xl">
          Hech narsa topilmadi!
        </h1>
        <Link to="/" className="btn btn-primary btn-sm md:btn-md">
          Go Home
        </Link>
      </div>
    );
  }
  return (
    <div className="align-elements">
      <div className="my-10">
        <Search />
      </div>

      <div className="mb-10 flex flex-col items-center">
        <button
          onClick={handleRandom}
          className="btn btn-lg btn-success text-white"
        >
          Random Pictures
        </button>
      </div>

      {allImages.length > 0 && (
        <ImageContainer images={allImages} pending={isPending} />
      )}

      {!isPending && allImages.length > 0 && (
        <div className="my-10">
          <button
            onClick={() => setPageParam(pageParam + 1)}
            className="btn btn-lg btn-primary btn-block"
          >
            Read More
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
