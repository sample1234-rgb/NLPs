import React from "react";
import { Card, Image } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Image src={product.image} />
      <Card.Body>
        <Link to={{pathname: `/product/${ product._id }`}}>
          <Card.Title as="div">{product.name}</Card.Title>
        </Link>
        <Card.Text as="h5"> &#8377; {product.price}</Card.Text>
        <Card.Text>
          <Rating val={product.ratings} text={product.review_num} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;
