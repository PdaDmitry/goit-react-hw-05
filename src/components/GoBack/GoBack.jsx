import { NavLink } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import css from './GoBack.module.css';

export default function GoBack() {
  return (
    <div className={css.container}>
      <NavLink to="/" className={css.contLinkBack}>
        <p className={css.textLink}>
          <IoIosArrowRoundBack size="24" />
          Go back
        </p>
      </NavLink>
    </div>
  );
}
