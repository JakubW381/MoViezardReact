import './App.css';
import api from './axios/axiostest';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Article from './components/article/Article';
import Login from './components/auth/Login';

function App() {

  const genres = ["Action",
                  "Adventure",
                  "Animation",
                  "Comedy",
                  "Crime",
                  "Documentary",
                  "Drama",
                  "Family",
                  "Fantasy",
                  "History",
                  "Horror",
                  "Music",
                  "Mystery",
                  "Romance",
                  "Science Fiction",
                  "TV Movie",
                  "Thriller",
                  "War",
                  "Western"];

  const [movies, setMovies] = useState([]);

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
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/article" element={<Article />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
