import { Link, useLocation } from 'react-router-dom';

export default function Movie({ data: { title }, id }) {
  const location = useLocation();

  return (
    <Link to={`/movies/${id}`} state={location}>
      {title}
    </Link>
  );
}
