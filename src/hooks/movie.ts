import { useEffect, useState } from "react";
import { MovieList } from "../types/Movie";
import axios from "axios";
import { RequestState } from "../types/Request";

const BASE_URL =
  "https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const useMovieData = (id?: string) => {
  const [movies, setMovies] = useState<MovieList>([]);
  const [reqState, setReqState] = useState(RequestState.Pending);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get("Film.JSON");
      return response.data as MovieList;
    } catch (e) {
      setReqState(RequestState.Failed);
    }
  };

  useEffect(() => {
    fetchData().then((movies) => {
      const result = movies?.filter(
        (movie) => id == undefined || movie.imdbID == id
      );
      setReqState(RequestState.Succeeded);
      console.log(result);
      result && setMovies(result);
    });
  }, []);

  return { movies, setMovies, reqState };
};
