import React from 'react';

const ReviewList = ({reviews}) => {
  if (!reviews.length) {
    return <h3>Be the first to review this film</h3>;
  }
  return (
    <div className='m-4 reviews card border-dark'>
      <h3 className='card-title border-bottom border-danger'>
        User Reviews
      </h3>
      <div className='card-body'>
        {reviews &&
          reviews.map(review => (
            <div key={review._id}>
              <p className='card-text'>
                {review.username} reviewed at {review.createdAt}
              </p>
              <div>
                <p className='card-text'>{review.reviewBody}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
};


export default ReviewList;