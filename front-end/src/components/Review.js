import React from "react";
import { Alert } from "react-bootstrap";
import Rating from "../components/Rating";

function Review({ variant, review, id }) {
  return (
    <Alert variant={variant}>
        user: {review.user} <br/>
        <Rating val={review.ratings} text={''} />
        {review.name}
        <br />
        {review.review}
        { review.user === id && (
            <div><a href="#">Edit</a></div>
        ) }

        </Alert>
  );
}
export default Review;
