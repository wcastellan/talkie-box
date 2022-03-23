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
    <div className='m-4 card border-dark'>
      
      <form
        onSubmit={handleFormSubmit}
        className='card-body'
      >
        <textarea
          placeholder='What did you think of this film?'
          value={reviewBody}
          onChange={handleChange}
          className='ml-4 mb-2 card border border-dark'
          style={{ width: 800, height: 100 }}
        ></textarea>
        <p className={`ml-4 ${characterCount === 300 ? 'text-error' : ''}`}>
          Character Count: {characterCount}/300
          {error && <span className='ml-4'>Something went wrong</span>}
        </p>
        <button type="submit" className="btn btn-danger mr-2 ml-4" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;