import Movie from '../Movie/Movie';
import css from './MovieList.module.css';

export default function MovieList({ items }) {
  return (
    <ul className={css.contListMovies}>
      {items.map(item => (
        <li key={item.id}>
          <Movie data={item} id={item.id} />
          {/* <>{item.title}</> */}
        </li>
      ))}
    </ul>
  );
}
