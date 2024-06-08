import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api';
import MovieList from '../components/MovieList/MovieList';

export default function HomePage() {
  const [listMovies, setListMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController(); //To cancel an http request that the request was not duplicated.

    async function fetchTrending() {
      try {
        const results = await getTrendingMovies({
          abortController: controller, //for controller
        });
        setListMovies(results);
        // console.log('HomePage ', results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.log(error);
        }
      }
    }
    fetchTrending();

    return () => {
      controller.abort(); //for controller
    };
  }, []);

  return (
    <div>
      <h3>Trending today</h3>
      <MovieList items={listMovies} />
    </div>
  );
}
