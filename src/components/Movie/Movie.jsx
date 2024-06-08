import { Link } from 'react-router-dom';

export default function Movie({ data: { title }, id }) {
  return <Link to={`/movies/${id}`}>{title}</Link>;
}
