
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { useParams } from 'react-router-dom';

const Stars = (props) => {
    const [item, setItem] = useState()

    const handleChange = e => {
        setItem({...item,[e.target.name]: e.target.value});
    };
    

return  (
    <div>
    {props.item.map(star => (
        <input
        type="text"
        name="stars"
        onChange={handleChange}
        placeholder="Stars, separated by commas ( , )"
        value={props.item.stars}
    />
    ))}
    </div>
    )
}
export default Stars