import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieWatchList.css'
function MovieWatchList(){
  const {id} = useParams();
  const [movies, setMovies] = useState([]);
  let result;
  useEffect(() => {
    async function fetchMovies(){
      try{
        const response = await fetch(`http://localhost:3033/api/users/watchHistory/${id}`);
        if(!response.ok) throw new Error("http request unsuccessful");
        result = await response.json();
        console.log(result);
        console.log("hi sir");
      }catch(err){
        console.error("error while fetching watch History : ",err);
      }
      setMovies(result);
    }
    fetchMovies();
  }, []);

  return (
    <div className="movie-list-container">
      <h1>Movie Watch History</h1>
      <ul className="movie-list">
        {movies.map(movie => 
          <li key={movie.watch_id} className="movie-item">
            <h2>{movie.movie_title}</h2>
            <p>Director: {movie.director_name}</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MovieWatchList;