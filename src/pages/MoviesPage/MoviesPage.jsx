import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { searchMovies } from '../../api';

import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { RiSearch2Line } from 'react-icons/ri';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [params, setParams] = useSearchParams();

  const query = params.get('query') ?? '';

  useEffect(() => {
    if (query === '') return;

    async function fetchSearchMovies() {
      try {
        setError(false);
        setLoading(true);
        setFetchedMovies([]);

        const { result, totalResult } = await searchMovies(query);
        setFetchedMovies(result);

        if (totalResult === 0) {
          toast.error('No movies found for the given query.');
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const entryField = e.target.elements.query.value.trim();

    if (entryField === '') {
      toast.error('The form field must be filled in!');
      return;
    }

    params.set('query', entryField);
    setParams(params);

    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={css.contSearch}>
          <input className={css.input} type="text" name="query" placeholder="Search movies..." />
          <button className={css.btnSearch} type="submit">
            <RiSearch2Line className={css.iconSearch} />
            Search
          </button>
        </div>
      </form>
      {loading && <Loader />}
      <Toaster />
      {error && <ErrorMessage />}
      {!error && fetchedMovies.length > 0 && <MovieList items={fetchedMovies} />}
    </div>
  );
}
