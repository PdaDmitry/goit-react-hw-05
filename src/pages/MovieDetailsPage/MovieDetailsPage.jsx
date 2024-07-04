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

  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    vote_average,
    production_countries,
    overview,
    genres,
    original_language,
  } = movie || {};

  let score = Math.round(vote_average * 10);

  return (
    <div className={css.container}>
      {movie && (
        <div
          className={css.backgroundOverlay}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop_path})`,
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
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              style={{ maxWidth: '300px', borderRadius: '4px' }}
            />
          </div>
          <ul className={css.contDataMovie}>
            <li>
              <h2>
                {title} ({release_date.slice(0, 4)})
              </h2>
              <p>User score: {score}%</p>
            </li>
            <li>
              <h3>Country</h3>
              <p>{production_countries.map(item => item.name).join(', ')}</p>
            </li>
            <li>
              <h3>Overview: </h3>
              <p>{overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <p>{genres.map(item => item.name).join(', ')}</p>
            </li>
            <li>
              <h4>Original Language:</h4>
              <p>{original_language}</p>
            </li>
          </ul>
        </div>
      )}
      <div className={css.contLink}>
        <h3 className={css.titleInform}>Additional information</h3>
        <ul className={css.contTextLink}>
          <li>
            <NavLink to="cast" className={css.castReviewsClass}>
              <p>Cast</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={css.castReviewsClass}>
              <p>Reviews</p>
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
