import { useEffect, useState } from 'react';
import { getReviews } from '../../api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchReviews() {
      try {
        setLoading(true);
        setError(false);

        const result = await getReviews(movieId, { abortController: controller });
        setReviews(result);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.log(error);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();

    return () => {
      controller.abort(); //for controller
    };
  }, [movieId]);

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '20px' }}>Movie Reviews</h3>
      <ul>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {reviews && reviews.results.length > 0
          ? reviews.results.map((review, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Author: {review.author}</p>
                <p>{review.content}</p>
              </li>
            ))
          : !loading &&
            !error && (
              <p style={{ paddingBottom: '50px' }}>We don`t have any reviews for this movie.</p>
            )}
      </ul>
    </div>
  );
}
