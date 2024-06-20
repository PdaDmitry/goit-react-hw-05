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
  // console.log('getTrendingMovies ', results);
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
  console.log('MovieDetails ', response.data);
  const result = response.data;
  return result;
};

export const getСast = async (movieId, { abortController }) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    signal: abortController.signal,
    params: {
      api_key: ACCESS_KEY,
      language: 'en-US',
    },
  });
  // console.log('cast ', response.data);
  const result = response.data;
  return result;
};

export const getReviews = async (movieId, { abortController }) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    signal: abortController.signal,
    params: {
      api_key: ACCESS_KEY,
      language: 'en-US',
    },
  });
  // console.log('reviews ', response.data);
  const result = response.data;
  return result;
};

export const searchMovies = async query => {
  const response = await axios.get(`/search/movie`, {
    params: {
      api_key: ACCESS_KEY,
      language: 'en-US',
      query: query,
      include_adult: false,
      page: '1',
      append_to_response: 'videos,images',
    },
  });

  // console.log('searchMovies ', response.data);
  const result = response.data.results;
  const totalResult = response.data.total_results;
  return { result, totalResult };
};
