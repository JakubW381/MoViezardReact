import React, { useState, useEffect } from "react";
import api from "../../axios/axiostest";
import './Home.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const Home = () => {

  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", 
    "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"
  ];

  const [moviesByGenre, setMoviesByGenre] = useState({});

  const getMovies = async (genre) => {
    try {
      const response = await api.get(`/api/movie/random/10?genre=${genre}`);
      setMoviesByGenre(prevState => ({
        ...prevState,
        [genre]: response.data
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
    genres.forEach(genre => getMovies(genre));
  }, []);

  return (
    <div>
      {genres.map((genre) => {
        const movies = moviesByGenre[genre];

        return (
          <div key={genre}>
            <h2>{genre}</h2>
            {movies ? (
                <div className="movie-carousel-containers">
                    <Carousel>
                        {movies.map((movie, index) => {
                            return (
                                <Paper>
                                    <div className="movie-card-container">
                                        <div className="movie-card" style={{"--img": `url(${movie.image})`}}>
                                            <div className="movie-detail">
                                                <div className="movie-poster">
                                                    <img src={movie.image} alt=""/>
                                                </div>
                                                <div className="movie-title">
                                                    <h4>{movie.title}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            )
                        })}
                    </Carousel>
              </div>
            ) : (
              <p>Loading {genre} movies...</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
