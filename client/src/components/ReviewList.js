import React from 'react';

const ReviewList = (reviews) => {
  if (!reviews.length) {
    return <h3>Be the first to review this film</h3>;
  }
  return (
    <div>
      {reviews &&
        reviews.map(review => (
          <div className='m-4 reviews card border-dark' key={review._id}>
            <p className='card-text'>
              {review.username} reviewed at {review.createdAt}
            </p>
            <div>
              <p className='card-text'>{review.reviewText}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default ReviewList;