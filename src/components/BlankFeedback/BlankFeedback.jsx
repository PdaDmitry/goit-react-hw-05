import css from './BlankFeedback.module.css';

export default function BlankFeedback() {
  return (
    <div>
      <p className={css.textFeedback}>Sorry! Nothing was found for your request!</p>
    </div>
  );
}
