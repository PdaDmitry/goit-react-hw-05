import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getСast } from '../../api';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const result = await getСast(movieId);
        setCast(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCast();
  }, [movieId]);

  return (
    <ul className={css.contCast}>
      {cast ? (
        cast.cast.map(actor => (
          <li key={actor.id} className={css.actorPhoto}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                  : '../../../public/smile-3233682_1280.jpg'
              }
              alt={actor.name}
              style={{ width: '100px', height: '150px', objectFit: 'cover' }}
            />
            <h3>{actor.name}</h3>
            <p>Character: {actor.character}</p>
          </li>
        ))
      ) : (
        <p>No actor photos found!</p>
      )}
    </ul>
  );
}

//  return (
//    <ul>
//      {cast ? (
//        cast.cast.map(actor => (
//          <li key={actor.id}>
//            <img
//              src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
//              alt={actor.name}
//              style={{ width: '100px' }}
//            />
//            <p>{actor.name}</p>
//          </li>
//        ))
//      ) : (
//        <p>No actor photos found!</p>
//      )}
//    </ul>
//  );
