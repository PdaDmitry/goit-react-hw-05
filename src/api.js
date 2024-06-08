import axios from 'axios';

const ACCESS_KEY = 'af9e9bc42b69245944bca0220d8dd63b';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
// const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1';

export const getTrendingMovies = async ({ abortController }) => {
  const response = await axios.get(`/trending/movie/day`, {
    signal: abortController.signal,
    params: {
      api_key: ACCESS_KEY,
      language: 'en-US',
      page: 1,
    },
  });

  const results = response.data.results;
  return results;
};

export const getMovieById = async (movieId, { abortController }) => {
  const response = await axios.get(`/movie/${movieId}`, {
    signal: abortController.signal,
    params: {
      api_key: ACCESS_KEY,
      language: 'en-US',
    },
  });
  // console.log('MovieDetails ',response.data);
  const result = response.data;
  return result;
};

export const getСast = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      api_key: ACCESS_KEY,
      language: 'en-US',
    },
  });
  console.log('cast ', response.data);
  const result = response.data;
  return result;
};

export const getReviews = async movieId => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      api_key: ACCESS_KEY,
      language: 'en-US',
    },
  });
  console.log('reviews ', response.data);
  const result = response.data;
  return result;
};
