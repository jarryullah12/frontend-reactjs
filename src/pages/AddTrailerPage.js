import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieByIdFromAdmin, addTrailerToMovie } from '../services/adminService';

const AddTrailerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    // Fetch the movie data
    const movieData = fetchMovieByIdFromAdmin(id);
    if (movieData) {
      setMovie(movieData);
      setLoading(false);
    } else {
      setError('Movie not found');
      setLoading(false);
    }
  }, [id]);
  
  useEffect(() => {
    // If this is movie ID 6, automatically add the trailer
    if (movie && movie.id === 6) {
      // Add a custom trailer for this movie
      const trailer = {
        title: `${movie.title} - Official Trailer`,
        url: 'https://www.youtube.com/embed/KAOdjqyG37A', // Interstellar trailer
        description: `Experience the epic journey of ${movie.title} in this official trailer.`,
        duration: '2:45'
      };
      
      // Add a second trailer
      const trailer2 = {
        title: `${movie.title} - Teaser`,
        url: 'https://www.youtube.com/embed/zSWdZVtXT7E', // Interstellar teaser
        description: 'A glimpse into the upcoming adventure.',
        duration: '1:30'
      };
      
      // Add trailers to the movie
      const result1 = addTrailerToMovie(movie.id, trailer);
      const result2 = addTrailerToMovie(movie.id, trailer2);
      
      if (result1 && result2) {
        setSuccess(true);
        // Redirect to movie detail page after 2 seconds
        setTimeout(() => {
          navigate(`/movie/${movie.id}`);
        }, 2000);
      } else {
        setError('Failed to add trailers');
      }
    }
  }, [movie, navigate]);
  
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button 
            onClick={() => navigate(`/movie/${id}`)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Back to Movie
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-lg">
        {success ? (
          <div className="text-center">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <h2 className="text-2xl font-bold text-white mb-4">Trailers Added Successfully!</h2>
            <p className="text-gray-300 mb-6">Redirecting to movie page...</p>
            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Adding Trailers to {movie?.title}</h2>
            <p className="text-gray-300 mb-6">Please wait while we add trailers to this movie...</p>
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTrailerPage;
