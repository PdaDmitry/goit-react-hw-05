import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div>
      <p>Sorry, page not found!</p>

      <Link to="/" className={css.contLinkHome}>
        Back to home page
      </Link>
    </div>
  );
}
