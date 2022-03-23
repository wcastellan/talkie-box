import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_REVIEW } from '../utils/mutations';
import { QUERY_REVIEWS } from '../utils/queries';

const ReviewForm = ({match}) => {
  const [reviewBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS});
        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] }
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
  const handleChange = event => {
    if (event.target.value.length <= 300) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addReview({
        variables: { reviewBody, "imdbID": match }
      });
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 300 ? 'text-error' : ''}`}>
        Character Count: {characterCount}/300
        {error && <span className='ml-2'>Something went wrong</span>}
      </p>
      <form
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder='What did you think of this film?'
          value={reviewBody}
          onChange={handleChange}
        ></textarea>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;