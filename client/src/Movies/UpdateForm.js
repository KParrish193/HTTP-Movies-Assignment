import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();

    useEffect(() => {
      const movieToUpdate = props.savedList.find(movie => `${movie.id}` === id);
      if (movieToUpdate) {
        setMovie(movieToUpdate);
      }
    }, [props.savedList, id]);


  const handleChanges = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    // make a PUT request to edit the item
    
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log('Put Success', res);
        props.savedList([res.data]);
        props.history.push('/movies');
        setMovie(initialMovie);
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
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="Title"
          value={movie.title}
        />
        <input
          type="text"
          name="price"
          onChange={handleChanges}
          placeholder="Director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={handleChanges}
          placeholder="Score"
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={handleChanges}
          placeholder="Stars, separated by commas ( , )"
          value={movie.stars}
        />

        <button className="update-form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;