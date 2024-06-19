import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
// import clsx from 'clsx';
import { getMovieById } from '../../api';
import GoBack from '../../components/GoBack/GoBack';
import css from './MovieDetailsPage.module.css';

// const castReviewsLinkClass = ({ isActive }) => {
//   return clsx(css.link, isActive && css.active);
// };

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieId() {
      try {
        const result = await getMovieById(movieId, { abortController: controller }); //received movie by id
        setMovie(result);
        // console.log('MovieDetails ', result);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.log(error);
        }
      }
    }
    fetchMovieId();

    return () => {
      controller.abort(); //for controller
    };
  }, [movieId]);

  return (
    <div
    // className={css.container}
    // style={{
    //   '--background-image': movie
    //     ? `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`
    //     : 'none',
    // }}
    >
      <GoBack />
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
            </li>
            <li>
              <h3>Country</h3>
              <p>{movie.production_countries.map(item => item.name).join(' ')}</p>
            </li>
            <li>
              <h3>Overview: </h3>
              <p>{movie.overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <p>{movie.genres.map(item => item.name).join(' ')}</p>
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
            <NavLink to="credits" className={css.castReviewsClass}>
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
        <Outlet />
      </div>
    </div>
  );
}
