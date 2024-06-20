import { NavLink, useLocation } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useRef } from 'react';
import css from './GoBack.module.css';

export default function GoBack() {
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  return (
    <div className={css.container}>
      <NavLink to={backLinkRef.current ?? '/'} className={css.contLinkBack}>
        <p className={css.textLink}>
          <IoIosArrowRoundBack size="24" />
          Go back
        </p>
      </NavLink>
    </div>
  );
}
