import { useEffect, useState } from 'react';
import trendingMovies from '../api';
import MovieList from '../components/MovieList/MovieList';

export default function HomePage() {
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const result = await trendingMovies();
        setListMovies(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrending();
  }, []);

  return (
    <div>
      <h3>Trending today</h3>
      <MovieList items={listMovies} />
    </div>
  );
}
