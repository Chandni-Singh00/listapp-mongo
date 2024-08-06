import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    axios.defaults.withCredentials=true;
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get('http://listapp-mongo-server.vercel.app/movies');
                setMovie(response.data);
            } catch (err) {
                console.error('Error fetching movie:', err);
                setError('Failed to fetch movie data.');
            }
        };

        fetchMovie();
    }, []);

    if (error) {
        return <p>{error}</p>; // Display an error message if there's an issue fetching the movie data
    }

    if (!movie) {
        return <p>Loading...</p>; // Display a loading message until movie data is available
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.plot}</p>
            <p>Year: {movie.year}</p>
            {/* Add more movie details here */}
        </div>
    );
}

export default App;
