import React, { useEffect, useState } from 'react';
import './MovieGrid.css';
import { useNavigate, useParams} from 'react-router-dom';

function MovieGrid() {
    // const [searchParams] = useSearchParams();
    // const age = searchParams.get("age");
    const {id,age,userid} = useParams();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    async function getFilteredMovie() {
        try {
            const response = await fetch(`http://localhost:3033/api/users/moviegrid/${id}/${age}?filter=${filter}`); //To make the query parameter encoding safer, you can use encodeURIComponent on filter

            if (!response.ok) {
                throw new Error('HTTP request was unsuccessful');
            }

            const result = await response.json();
            console.log("Fetched filtered movies:", result); // Log the result
            setData(result); // Update the state with fetched movies
        } catch (err) {
            console.error("Something went wrong:", err);
        }
    }

    useEffect(()=>{
        getFilteredMovie();
    },[])

    function handleChange(e){
        setFilter(e.target.value);
    }
    function movieDetails(movieId) {
        navigate(`/movies/${id}/${movieId}`);
    }

    function filterMovie(e) {
        if (e.key === 'Enter') { 
            getFilteredMovie(); 
        } else {
            setFilter(e.target.value); 
        }
    }

    function gotoProfiles(){
        navigate(`/profiles/${userid}`);
    }

    function goToWatchHistory(){
        navigate(`/watchHistory/${id}`);
    }

    function goToLogin(){
        navigate(`/`);
    }

    return (
        <>
            <header className="header">
                <div className="contents-left">
                    <p onClick={goToLogin} >Logout</p>
                </div>
                <div>
                    <input
                        type='text'
                        className='search-bar'
                        value={filter}
                        placeholder='Search Movies'
                        onChange={(e)=>handleChange(e)}
                        onKeyDown={filterMovie} 
                    />
                </div>
                <div className="contents-right">
                    <p onClick={gotoProfiles} >Go To Profiles</p><p onClick={goToWatchHistory} >Watch History</p>
                    

                </div>
            </header>
            <div className="movie-container">
                {data.length === 0 ? (
                    <p>No movies found</p>
                ) : (
                    data.map(movie => (
                        <div className="movie" key={movie.movie_id} onClick={() => movieDetails(movie.movie_id)}>
                            <div className="image-container">
                                <img src={movie.picture_url} alt={movie.movie_title} />
                            </div>
                            <div className="movietitle-container">
                                <h3>{movie.movie_title}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
export default MovieGrid;
