// API service for fetching movie data from the backend
const API_URL = 'http://localhost:4000/api'; // Updated to point to the admin panel

// Fetch featured movies from the API
export const fetchFeaturedMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movies/featured`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching featured movies:', error);
    throw error;
  }
};

// Fetch latest/now playing movies from the API
export const fetchLatestMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movies/latest`);
    if (!response.ok) {
      throw new Error('Failed to fetch latest movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    throw error;
  }
};

// Fetch coming soon movies from the API
export const fetchComingSoonMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movies/coming-soon`);
    if (!response.ok) {
      throw new Error('Failed to fetch coming soon movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching coming soon movies:', error);
    throw error;
  }
};

// Fetch all movies from the API
export const fetchAllMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movies`);
    if (!response.ok) {
      throw new Error('Failed to fetch all movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
};

// Fetch a single movie by ID
export const fetchMovieById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/movies/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie with ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    throw error;
  }
};
