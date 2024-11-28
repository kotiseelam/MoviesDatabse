'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', actors: '', releaseYear: '' });
  const [editingMovie, setEditingMovie] = useState(null);

  // Fetch movies from the API
  useEffect(() => {
    fetch('/api/movies')
      .then((res) => {
        console.log(res); // Log the response object
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => console.error('Error fetching movies:', err));
  }, []);

  // Handle form submission to add a movie
  const handleAddMovie = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newMovie.title,
        actors: newMovie.actors.split(',').map((actor) => actor.trim()),
        releaseYear: parseInt(newMovie.releaseYear, 10),
      }),
    });
    const addedMovie = await response.json();
    setMovies((prev) => [...prev, addedMovie]);
    setNewMovie({ title: '', actors: '', releaseYear: '' });
  };

  // Handle form submission to edit a movie
  const handleUpdateMovie = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/movies', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingMovie),
    });
    const updatedMovie = await response.json();
    setMovies((prev) =>
      prev.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
    );
    setEditingMovie(null);
  };

  // Handle deleting a movie
  const handleDelete = async (id) => {
    await fetch('/api/movies', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Movie Database</h1>
        <nav>
          <Link href="/">
            <a className="text-gray-400 hover:text-white px-4">Home</a>
          </Link>
          <Link href="/movies">
            <a className="text-gray-400 hover:text-white px-4">Movies</a>
          </Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Movies List</h2>
        <ul className="space-y-4">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => setEditingMovie(movie)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Add a New Movie</h2>
        <form
          onSubmit={handleAddMovie}
          className="bg-gray-800 p-6 rounded shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title:</label>
            <input
              type="text"
              value={newMovie.title}
              onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Actors (comma-separated):
            </label>
            <input
              type="text"
              value={newMovie.actors}
              onChange={(e) => setNewMovie({ ...newMovie, actors: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Release Year:</label>
            <input
              type="number"
              value={newMovie.releaseYear}
              onChange={(e) => setNewMovie({ ...newMovie, releaseYear: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Add Movie
          </button>
        </form>

        {editingMovie && (
          <form
            onSubmit={handleUpdateMovie}
            className="bg-gray-800 p-6 rounded shadow-md space-y-4 mt-10"
          >
            <h2 className="text-2xl font-semibold">Edit Movie</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Title:</label>
              <input
                type="text"
                value={editingMovie.title}
                onChange={(e) =>
                  setEditingMovie({ ...editingMovie, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Actors:</label>
              <input
                type="text"
                value={editingMovie.actors.join(', ')}
                onChange={(e) =>
                  setEditingMovie({
                    ...editingMovie,
                    actors: e.target.value.split(',').map((actor) => actor.trim()),
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Release Year:</label>
              <input
                type="number"
                value={editingMovie.releaseYear}
                onChange={(e) =>
                  setEditingMovie({
                    ...editingMovie,
                    releaseYear: parseInt(e.target.value, 10),
                  })
                }
                className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update Movie
              </button>
              <button
                type="button"
                onClick={() => setEditingMovie(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
