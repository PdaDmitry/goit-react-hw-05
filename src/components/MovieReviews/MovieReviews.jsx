import { useEffect, useState } from 'react';
import { getReviews } from '../../api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function MovieReviews() {
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchReviews() {
      try {
        setLoading(true);

        const result = await getReviews(movieId, { abortController: controller });
        setReviews(result);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.log(error);
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
    <ul>
      {loading && <Loader />}
      {reviews && reviews.results.length > 0 ? (
        reviews.results.map((review, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            {review.content}
          </li>
        ))
      ) : (
        <p>We do not have any reviews for this movie.</p>
      )}
    </ul>
  );
}
