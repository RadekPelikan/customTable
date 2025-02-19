import React from "react";
import { Movie } from "./types/Movie";

const MovieCard = (props: Movie) => {
  const IMAGE_COUNT = 1;

  return (
    <>
      <div className="px-4 py-3 transition-transform bg-blue-300 rounded-md min-h-32 hover:scale-105">
        <div className="grid grid-cols-6">
          <p></p>
          <h3 className="col-span-4 col-start-2 text-xl text-center text-slate-800">
            {props.Title}
          </h3>
          <p className="text-right">
            {props.Year.slice(-1) == "–"
              ? props.Year.slice(0, props.Year.search("–"))
              : props.Year}
          </p>
        </div>
        {props.Images.slice(0, IMAGE_COUNT).map((imageUrl) => (
          <>
            <img src={imageUrl} className="object-cover w-full h-52 " />
          </>
        ))}
      </div>
    </>
  );
};

export default MovieCard;
