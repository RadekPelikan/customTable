import { useEffect, useState } from "react";
import { MovieList } from "../types/Movie";

const BASE_URL =
  "https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON";

export const useMovieData = (id?: string) => {
  const [movies, setMovies] = useState<MovieList>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(BASE_URL);
    const data = (await response.json()) as MovieList;
    const result = data.filter(
      (movie) => id == undefined || movie.imdbID == id
    );
    setIsLoading(false);
    console.log(result);
    return result;
  };

  useEffect(() => {
    fetchData().then((movies) => setMovies(movies));
  }, []);

  return { movies, setMovies, isLoading };
};
