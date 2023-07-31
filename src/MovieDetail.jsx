import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./components/Loading";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState([]);

  const getMovie = async () => {
    setLoading(true);
    setTimeout(async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=85b9a93cd6250174a09332d904fba2ae`
      );
      setMovie(res.data);
      setLoading(false);
    }, 400);
  };

  const getCredits = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=85b9a93cd6250174a09332d904fba2ae`
    );
    setCredits(res.data.cast);
  };

  const getVideo = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=85b9a93cd6250174a09332d904fba2ae`
    );
    setVideo(res.data.results[0]);
  };

  const genres = movie.genres
    ? movie.genres.map((genre) => (
        <div
          className="bg-red-500 text-white px-8 py-2 md:px-6 md:py-2 rounded-full text-sm flex items-center justify-center whitespace-nowrap w-auto"
          key={genre.id}
        >
          {genre.name}
        </div>
      ))
    : null;

  useEffect(() => {
    getMovie();
    getCredits();
    getVideo();
    console.log(credits);
  }, [id]);

  //   useEffect(() => {
  //     console.log(video.name);
  //   }, []);

  return (
    <>
      {!loading ? (
        <div className="container my-10 md:my-12">
          <Link
            to={"/"}
            className="text-white flex items-center gap-2 mb-8 hover:translate-x-2 transition duration-300"
          >
            <ion-icon name="arrow-back" />
            Kembali
          </Link>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-[1000px]">
            <img
              src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
              alt=""
              className="w-96 h-[500px] object-cover rounded-lg"
            />
            <div className="my-2 md:my-8">
              <span className="text-red-500 text-2xl font-semibold">
                {movie.adult == true ? "18+" : null}
              </span>
              <h1 className="text-white text-2xl md:text-6xl font-semibold w-full">
                {movie.original_title}
              </h1>
              <p className="text-slate-400 my-2 italic">{movie.tagline}</p>
              <div className="flex gap-2 my-4 overflow-x-auto">{genres}</div>
              <span className="text-slate-400">
                Release date:{" "}
                <span className="font-bold">{movie.release_date}</span>
              </span>
              <p className="text-slate-300 my-4">{movie.overview}</p>
              <div className="flex items-center gap-4 my-6">
                <div className="flex items-center gap-2 text-yellow-500 text-sm">
                  <ion-icon name="star"></ion-icon>
                  {movie.vote_average}
                </div>
                <div className="flex items-center gap-2 text-blue-500 text-sm">
                  <ion-icon name="people"></ion-icon>
                  {movie.popularity}
                </div>
                <div className="flex items-center gap-2 text-green-500 text-sm">
                  <ion-icon name="cash"></ion-icon>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(movie.revenue)}
                </div>
              </div>

              <h1 className="text-white text-xl font-semibold mb-5">Actors</h1>
              <div className="flex overflow-x-scroll mb-5 gap-4 text-white max-w-[1000px]">
                {credits.map((credit) => (
                  <div className="bg-slate-700 rounded-lg w-80 px-4 py-4 flex gap-4 items-center flex-shrink-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span>{credit.name}</span>
                      <span className="text-sm text-slate-400">
                        {credit.character}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h1 className="text-white text-xl font-semibold mb-5">Video</h1>
                <iframe
                  className="w-full h-[200px] md:w-[500px] md:h-[280px] rounded-lg"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MovieDetail;
