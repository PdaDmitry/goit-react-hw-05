import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { searchMovies } from '../api';
import MovieList from '../components/MovieList/MovieList';

export default function MoviesPage() {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const query = params.get('query') ?? '';

  useEffect(() => {
    if (query === '') return;
    // console.log('query ', query);
    async function fetchSearchMovies() {
      try {
        const results = await searchMovies(query);
        setFetchedMovies(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSearchMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const entryField = e.target.elements.query.value.trim();

    if (entryField === '') {
      toast.error('The form field must be filled in!', {
        duration: 2000,
        position: 'top-left',
        style: {
          background: 'orange',
          color: 'black',
        },
      });
      return;
    }
    // console.log('entryField ', entryField);

    params.set('query', entryField);
    setParams(params);

    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="query" placeholder="Search movies..." />
          <button type="submit">Search</button>
        </div>
      </form>
      {fetchedMovies && <MovieList items={fetchedMovies} />}
    </div>
  );
}
