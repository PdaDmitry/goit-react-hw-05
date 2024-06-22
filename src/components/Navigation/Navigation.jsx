import { NavLink } from 'react-router-dom';
import { SiThemoviedatabase } from 'react-icons/si';
import clsx from 'clsx';
import css from './Navigation.module.css';

const navLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.container}>
      <SiThemoviedatabase className={css.icon} />
      <ul className={css.contNav}>
        <li>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={navLinkClass}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
