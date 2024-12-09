import React from 'react';
import './MovieDetail.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
function MovieDetail(){
  const {id,movieId} = useParams();
  const [data, setData] = useState({});
  const [dataGenre,setDataGenre]=useState([]);
  useEffect(() => {
    async function fetchData(){
      try{
        const response = await fetch("http://localhost:3033/api/users/movies/"+movieId);
        if(!response.ok) throw new Error(`http request was unsuccesful`);
        const result = await response.json();
        setData(result.resultsC);
        setDataGenre(result.resultss)
        console.log(result.resultss);
      }catch(err){
        console.error("error occured : ",err)
      }
    }
    fetchData();
  },[])

  async function insertToWatchHistory(){
    console.log(id);
    console.log(movieId);
    try{
      const response = await fetch(`http://localhost:3033/api/users/watchHistory/${id}/${movieId}`,{
        method: 'POST'
      });
      if(!response.ok) throw new Error(`http request was unsuccesful`);
    }catch(err){
      console.error("something wrong while inserting into watch history table : ",err);
    }
  }
  return (
    <div className="movie-detail">
      <div className="movie-detail-content">
        <div className="movie-detail-header">
          <h1>{data.movie_title}</h1>
          <div className="movie-meta">
            <span className="movie-rating">{data.rating}</span>
            <span className="movie-year">{new Date(data.release_date).getFullYear()}</span>
            <span className="movie-language">{data.language_name}</span>
          </div>
        </div>
        <p className="movie-description">{data.description}</p>
        <div className="movie-info">
          <p><strong>Genres:</strong><div className='toDisplay' >
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                                          {dataGenre.map((genre, index) => (
                                            <p key={index} style={{ margin: '0 10px' }}>
                                              {genre.genre_name}
                                            </p>
                                            ))}
                                        </div>
                                      </div></p>
          <p><strong>Director:</strong> {data.director_name}</p>
          <button className="play-button" onClick={insertToWatchHistory}  >play</button>
        </div>
      </div>
      <div className="movie-backdrop" style={{backgroundImage: `url(${data.picture_url})`}}></div>
    </div>
  );
};

export default MovieDetail;