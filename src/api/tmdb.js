import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
});

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page, include_adult: false },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};