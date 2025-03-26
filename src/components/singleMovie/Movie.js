import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";
import { Button } from "react-bootstrap";

const Movie = ({ getMovieData, movie }) => {
    let params = useParams();
    const movieID = params.movieID;

    useEffect(() => {
        getMovieData(movieID);
    }, [getMovieData, movieID]);  // 👈 Dodano zależności w useEffect

    if (!movie) {
        return <p>Loading...</p>;  // 👈 Bezpieczne wyjście przy braku danych
    }

    return (<>
        <div className="movie-container">
            <div className="movie-main">
                <h2>{movie.title}</h2>
                <div>
                    <img src={movie.image} className="poster" alt={movie.title} />
                </div>
            </div>
            <div className="desc-trailer">
                <Button>Trailer</Button>
                <p>{movie.description}</p>
            </div>
        </div>
        <div className="reviews">
                <p>Reviews</p>
        </div>
        </>
    );
};

export default Movie;
