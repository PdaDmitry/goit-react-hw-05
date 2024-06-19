import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api';
import MovieList from '../components/MovieList/MovieList';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Loader from '../components/Loader/Loader';

export default function HomePage() {
  const [listMovies, setListMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); //To cancel an http request that the request was not duplicated.

    async function fetchTrending() {
      try {
        setError(false);
        setLoading(true);

        const results = await getTrendingMovies({
          abortController: controller, //for controller
        });
        setListMovies(results);
        // console.log('HomePage ', results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.log(error);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();

    return () => {
      controller.abort(); //for controller
    };
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {!error && <MovieList items={listMovies} />}
    </div>
  );
}
//
