import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getСast } from '../../api';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCast() {
      try {
        setLoading(true);
        setError(false);

        const result = await getСast(movieId, { abortController: controller });
        setCast(result);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.log(error);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCast();

    return () => {
      controller.abort(); //for controller
    };
  }, [movieId]);

  return (
    <div>
      <h3 className={css.titleCast}>Movie Cast</h3>
      <ul className={css.contCast}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {cast && cast.cast.length > 0
          ? cast.cast.map(actor => (
              <li key={actor.id} className={css.actorPhoto}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : 'https://cdn.pixabay.com/photo/2018/03/17/11/03/smile-3233682_1280.jpg'
                  }
                  alt={actor.name}
                  className={css.imgStyles}
                />
                <h3>{actor.name}</h3>
                <p className={css.textCharacter}>Character:</p>
                <p>{actor.character}</p>
              </li>
            ))
          : !loading && !error && <p className={css.noPhotos}>No actor photos found!</p>}
      </ul>
    </div>
  );
}
