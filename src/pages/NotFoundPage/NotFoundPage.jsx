import { NavLink } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <p className={css.textMessage}>Sorry, page not found!</p>

      <NavLink to="/" className={css.contLinkHome}>
        Back to home page
      </NavLink>
    </div>
  );
}
