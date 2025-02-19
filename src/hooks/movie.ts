import { useEffect, useState } from "react";
import { Movie, MovieList } from "../types/Movie";
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

  // Fetch new movies or new movie (based on ID if provided) on call of the custom useMovieData Hook
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

  // Delete a movie based on id
  const deleteMovie = async (id: string) => {
    setReqState(RequestState.Pending);
    try {
      await axiosClient.delete(id);
      setMovies((prev) => prev.filter((movie) => movie.imdbID != id));
    } catch (e) {
      setReqState(RequestState.Failed);
    }
  };

  // Update a movie based on a movie (Movie to update is determined by id within it)
  const updateMovie = async (movie: Movie) => {
    setReqState(RequestState.Pending);
    try {
      const request = await axiosClient.put(movie.imdbID, movie);
      const newMovie = request.data as Movie;
      const newMovieList = movies.filter(
        (_movie) => _movie.imdbID != movie.imdbID
      );
      newMovieList.push(newMovie);
      setMovies(newMovieList);
    } catch (e) {
      setReqState(RequestState.Failed);
    }
  };

  // Insert a new movie to database
  const createMovie = async (movie: Movie) => {
    setReqState(RequestState.Pending);
    try {
      const request = await axiosClient.post("/", movie)
      const newMovie = request.data as Movie;
      setMovies(prev => {
        prev.push(newMovie);
        return prev
      })
    } catch (e) {
      setReqState(RequestState.Failed);
    }
  }

  return { movies, deleteMovie, updateMovie, createMovie, reqState };
};
