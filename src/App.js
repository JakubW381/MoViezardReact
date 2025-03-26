import './App.css';
import api from './axios/axiostest';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Article from './components/article/Article';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Movie from './components/singleMovie/Movie';

function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();

  const getMovie = async (movieID) => {
    try {
      const response = await api.get(`/api/movie/${movieID}`);

      console.log(response.data);

      setMovie(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const getMovies = async () => {
    try {
      const response = await api.get("/api/movie/");

      console.log(response.data);

      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/article" element={<Article />}></Route>
          <Route path="/movie/:movieID" element={<Movie getMovieData={getMovie} movie={movie}/>}></Route>
          <Route path="/movies/:genre" element={<Genre genre={genre}/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
