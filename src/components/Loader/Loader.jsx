import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loaderCont}>
      <RotatingLines
        visible={true}
        height="20"
        width="20"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p className={css.loaderText}> Loading movies, please wait...</p>
    </div>
  );
}
