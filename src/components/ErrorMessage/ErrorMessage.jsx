import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div>
      <p className={css.errorText}>
        Whoops, something went wrong! Please try reloading this page! 🤔
      </p>
    </div>
  );
}
