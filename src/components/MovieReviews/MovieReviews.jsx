import { useEffect, useState } from 'react';
import { getReviews } from '../../api';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState('');

  useEffect(() => {
    async function fetchReviews() {
      try {
        const result = await getReviews(movieId);
        setReviews(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchReviews();
  }, [movieId]);

  return (
    <ul>
      {reviews.results ? (
        reviews.results.map((review, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            {review.content}
          </li>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </ul>
  );
}
