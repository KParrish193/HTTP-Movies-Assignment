import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './Movies/UpdateForm'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/`)
      .then(res => setMovies( res.data ))
      .catch(err => console.log(err.response));
  }, []);


  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/" 
        render={props => {
          return <MovieList 
            {...props}
            movies={movies}
        />
      }}
      />
      
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie 
          {...props} 
          addToSavedList={addToSavedList}
          savedList={savedList}
          setMovies={setMovies} 
          movies={movies}
          />;
        }}
      />
      
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateForm 
            {...props} 
            savedList={savedList}
            setMovies={setMovies}
            movies={movies} />
        }
      }
      />
    </>
  );
};

export default App;
