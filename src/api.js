import axios from 'axios';

export default async function trendingMovies() {
  const ACCESS_KEY = 'af9e9bc42b69245944bca0220d8dd63b';
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1';

  const response = await axios.get(url, {
    params: {
      api_key: ACCESS_KEY,
    },
  });

  const results = response.data.results;
  return results;
}
