import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { getMovieById } from '../../api';

import GoBack from '../../components/GoBack/GoBack';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieId() {
      try {
        setLoading(true);
        setError(false);

        const result = await getMovieById(movieId, { abortController: controller }); //received movie by id
        setMovie(result);
        // console.log('MovieDetails ', result);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.log(error);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchMovieId();

    return () => {
      controller.abort(); //for controller
    };
  }, [movieId]);

  return (
    <div className={css.container}>
      {movie && (
        <div
          className={css.backgroundOverlay}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          }}
        />
      )}

      <GoBack />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div className={css.contMovie}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ maxWidth: '300px', borderRadius: '4px' }}
            />
          </div>
          <ul className={css.contDataMovie}>
            <li>
              <h2>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h2>
              <p>User score: {Math.round(movie.vote_average * 10)}%</p>
            </li>
            <li>
              <h3>Country</h3>
              <p>{movie.production_countries.map(item => item.name).join(', ')}</p>
            </li>
            <li>
              <h3>Overview: </h3>
              <p>{movie.overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <p>{movie.genres.map(item => item.name).join(', ')}</p>
            </li>
            <li>
              <h4>Original Language:</h4>
              <p> {movie.original_language}</p>
            </li>
          </ul>
        </div>
      )}
      <div className={css.contLink}>
        <h3 className={css.titleInform}>Additional information</h3>
        <ul className={css.contTextLink}>
          <li>
            <NavLink to="cast" className={css.castReviewsClass}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={css.castReviewsClass}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={css.contOutlet}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
