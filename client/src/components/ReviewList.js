import React from 'react';

const ReviewList = ({reviews}) => {
  console.log(reviews)
  if (!reviews.length) {
    return <h3>Be the first to review this film</h3>;
  }
  return (
    <div>
      <h3>
        User Reviews
      </h3>
      <div>
        {reviews &&
          reviews.map(review => (
            <div key={review._id}>
              <p>
                {review.username} reviewed at {review.createdAt}
              </p>
              <div>
                <p>{review.reviewBody}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
};


export default ReviewList;