import React, { useState, useEffect } from "react";
import { Button, Container, Card, Row, Col, ListGroup, Image, Form } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Review from "../components/Review";
import PopUp from "../components/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail, createReview } from "../actions/productActions";

function ProductScreen() {
   const { id } = useParams();
   const [qty, setQty] = useState(1);

   const dispatch = useDispatch();
   const history = useNavigate();

   const [title, setTitle] = useState('');
   const [rbody, setRbody] = useState('');
   const [rating, setRating] = useState(0.0);

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const productDetail = useSelector((state) => state.productDetail);
   const { error, loading, product } = productDetail

   const reviewDetail = useSelector((state) => state.createReview);
   const { error:errorReview, loading:loadingReview, reviews } = reviewDetail

  useEffect(() => {
    dispatch(listProductDetail({id}));
//    dispatch(createReview({id}));
  }, [dispatch, id]);

  function add_to_cart_handler(){ history(`/cart/${id}?qty=${qty}`) }
  function add_review(){
    dispatch(createReview({
        'title': title,
        'comment': rbody,
        'rating': rating,
    },{id}));
    console.log('Review added');
  }
  function check(){

  }
  return (
    <div className="m-3">
      <Link to="/products/">
        <Button>Go Back</Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          
          <Row>
            <Col md={6}>
              <Card>
                <Image src={product.image} />
              </Card>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Price: </b> &#8377; {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating val={product.ratings} text={product.review_num} />
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.count_in_stock ? (
                    <b style={{ color: "green" }}>Stock</b>
                  ) : (
                    <b
                      style={{
                        textDecorationLine: "line-through",
                        color: "red"
                      }}
                    >
                      Stock
                    </b>
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="desc">
                  <b>Description:</b> {product.description}
                  <br />
                  <br />
                  {product.brand} / Category: {product.category}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <b>Price:</b> $ {product.price}
                </ListGroup.Item>
                { product.count_in_stock ?
                <ListGroup.Item>
                  <Row>
                    <Col><b>Quantity:</b></Col>
                    <Col xs='auto' className='my-1'>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                           { [...Array(product.count_in_stock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>{ x+1 }</option>
                           )) }
                        </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
                : <span></span>
                }
                <ListGroup.Item>
                    <Button
                      onClick={add_to_cart_handler}
                      disabled={product.count_in_stock === 0}
                      variant="warning"
                      type='button'
                    >
                      Add to Cart
                    </Button>
                    <Button
                      disabled={product.count_in_stock === 0}
                      variant="success"
                      onClick={add_to_cart_handler}
                    >
                      Buy Now
                    </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
                <h3>Reviews: </h3>
                { product.review ? (
                     product.review.map((review) => (
                        <Review variant="info" key={review._id} review={review} id={userInfo._id}/>
                        ))
                ) : <Message variant="warning">No Reviews Yet. You can provide first review</Message>}

                { userLogin ? (
                <Form>
                    <Row className='mb-2'>
                        <Form.Group as={Col} controlId='email' md={3}>
                          <Form.Label>Ratings</Form.Label>
                          <Form.Control
                              type='number'
                              value={rating}
                              min="0.0"
                              step="0.1"
                              max="5.0"
                              onChange={(e) => setRating(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId='email'>
                          <Form.Label>Review Title</Form.Label>
                          <Form.Control
                              type='text'
                              placeholder='Good Product'
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                    </Row>
                    <Form.Group controlId='password'>
                      <Form.Label>Comments: </Form.Label>
                      <Form.Control
                          type='text'
                          as='textarea'
                          row={4}
                          placeholder='Thank you for the meal, it is healthy and clean environment'
                          value={rbody}
                          onChange={(e) => setRbody(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                <Button variant="outline-secondary" className='my-3' onClick={add_review}>
                   Add Review
                </Button>
                </Form>
                ):''}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default ProductScreen;
