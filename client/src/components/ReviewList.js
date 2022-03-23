import React from 'react';

const ReviewList = (reviews) => {
  if (!reviews.length) {
    return <h3>Be the first to review this film</h3>;
  }
  return (
    <div>
      {reviews &&
        reviews.map(review => (
          <div key={review._id}>
            <p>
              {review.username} reviewed at {review.createdAt}
            </p>
            <div>
              <p>{review.reviewText}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default ReviewList;