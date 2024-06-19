import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getСast } from '../../api';

import css from './MovieCast.module.css';
import Loader from '../Loader/Loader';

export default function MovieCast() {
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCast() {
      try {
        setLoading(true);

        const result = await getСast(movieId, { abortController: controller });
        setCast(result);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.log(error);
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
    <ul className={css.contCast}>
      {loading && <Loader />}
      {cast && cast.cast.length > 0 ? (
        cast.cast.map(actor => (
          <li key={actor.id} className={css.actorPhoto}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : 'https://cdn.pixabay.com/photo/2018/03/17/11/03/smile-3233682_1280.jpg' ///        ../../../smile-3233682_1280.jpg
              }
              alt={actor.name}
              className={css.imgStyles}
              // style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '14px' }}
            />
            <h3>{actor.name}</h3>
            <p className={css.textCharacter}>Character:</p>
            <p>{actor.character}</p>
          </li>
        ))
      ) : (
        <p>No actor photos found!</p>
      )}
    </ul>
  );
}
