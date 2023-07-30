import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const getMovies = (keyword) => {
    if (keyword == "") {
      setLoading(true);
      setTimeout(async () => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?page=${randomNumber}&api_key=85b9a93cd6250174a09332d904fba2ae`
        );
        setMovies(res.data.results);
        setLoading(false);
      }, 500);
    } else {
      setLoading(true);
      setTimeout(async () => {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=85b9a93cd6250174a09332d904fba2ae`
        );
        setMovies(res.data.results);
        setLoading(false);
      }, 700);
    }
  };

  useEffect(() => {
    getMovies(keyword);
  }, [keyword]);

  return (
    <div className="container my-16 text-white">
      <h1 className="text-4xl text-slate-200 font-bold">MovieCuy.</h1>
      <p className="my-3 md:w-2/3 font-light text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
        saepe, magnam sequi optio vero odio nihil dolores laborum quod nulla
        accusantium facilis et dolore debitis animi obcaecati sint placeat rerum
      </p>
      <div className="flex justify-between gap-2 my-4">
        <input
          type="text"
          className="w-full py-3 px-4 rounded bg-slate-500 placeholder:text-sm placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Cari film favorit kamu..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Card Film */}
      {!loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 my-10">
          {movies.map((movie) => (
            <div key={movie.id}>
              <a href={`movie/${movie.id}`}>
                <div className="w-full cursor-pointer hover:scale-95 md:hover:scale-105 transition duration-500">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
                    alt=""
                    className="w-full h-[400px]"
                  />
                  <div className="bg-slate-800 p-4 h-auto">
                    <h1 className="text-slate-200 font-semibold text-lg">
                      {movie.title}
                    </h1>
                    <div className="flex justify-between mt-2">
                      <div>
                        <ion-icon name="star"></ion-icon>
                        <span className="ml-2">{movie.vote_average}</span>
                      </div>
                      <span className="text-slate-400">
                        {movie.release_date}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
