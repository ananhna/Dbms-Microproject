import React from 'react';
import MovieDetail from './MovieDetail';

const Movie = () => {
  const movieData = {
    title: "Inception",
    rating: "8.8",
    releaseDate: "2010",
    language: "English",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "Christopher Nolan",
    backdropUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"
  };

  return (
    <div className="App">
      <MovieDetail movie={movieData} />
    </div>
  );
};

export default Movie;