import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Stars from './Stars';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = props => {
    const [movieInfo, setMovieInfo] = useState(initialMovie);
    const { id } = useParams();

    useEffect(() => {
      const movieToUpdate = props.savedList.find(movie => `${movie.id}` === id);
      if (movieToUpdate) {
        setMovieInfo(movieToUpdate);
      }
    }, [props.savedList, id]);


  const handleChanges = (event, index) => {
    event.persist();
    if (event.target.name ==='actor') {
    setMovieInfo({
      ...movieInfo,
      stars: movieInfo.stars.map(( star, starindex) => starindex === index ? event.target.value : star )
      });
    } else {
      setMovieInfo({
        ...movieInfo,
      [event.target.name]: event.target.value
    });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieInfo)
      .then(res => {
        console.log('Put Success', res);
        props.savedList([res.data]);
        props.history.push('/movies');
        setMovieInfo(initialMovie);
      })
      .catch(err => {
        console.log(err);
        props.history.push('/');
    })
  };

  return (
    <div>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <Stars 
          item={movieInfo.stars}
        />
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="Title"
          value={movieInfo.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="Director"
          value={movieInfo.director}
        />

        <input
          type="text"
          name="metascore"
          onChange={handleChanges}
          placeholder="Score"
          value={movieInfo.metascore}
        />
      
        <button className="update-form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;