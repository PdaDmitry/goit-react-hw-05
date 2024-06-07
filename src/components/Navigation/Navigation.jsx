import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const nanLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav>
      <ul className={css.contNav}>
        <li>
          <NavLink to="/" className={nanLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={nanLinkClass}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
