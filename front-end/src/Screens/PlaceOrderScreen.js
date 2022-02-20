import React, { useEffect } from "react";
import { Container,Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen() {
    const orderc = useSelector(state => state.orderCreate);
    const { order, error, success } = orderc

    const cart = useSelector((state) => state.cartList);
    const { shippingAddress, paymentMethod } = cart;
    const cart_items = cart.cartItems ? cart.cartItems : cart;

    const dispatch = useDispatch();
    const history = useNavigate();

    cart.price = Number(cart_items.reduce((acc,x) =>  acc + (x.price*x.qnty), 0 ).toFixed(2));
    const itms = Number(cart_items.reduce((acc,x) =>  acc + x.qnty, 0 ));
    cart.shippingPrice = Number((0).toFixed(2));
    cart.taxPrice = Number((0.18 * cart.price).toFixed(2));
    cart.totalPrice = (cart.price + cart.shippingPrice + cart.taxPrice).toFixed(2);

    if(!paymentMethod){
        history('/payment');
    }
    else if(!shippingAddress.address){
        history('/shipping');
    }

    useEffect(()=>{
        if(success){
            history(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    },[success, dispatch, history, order])

    function submitHandler(e){
        e.preventDefault();
        dispatch(createOrder({
            'orderItems': cart_items,
            'shippingAddress': shippingAddress,
            'paymentMethod': paymentMethod,
            'itemPrice': cart.price,
            'shippingPrice': cart.shippingPrice,
            'taxPrice': cart.taxPrice,
            'totalPrice': cart.totalPrice,
        }));
        console.log('Submitted');
    }
    return (
        <div>
            <FormContainer>
                <CheckOutSteps step={4} />
            </FormContainer>
        <Container>
        <h2>Place Order</h2>
            <Row>
                <Col md={6}>
                    <ListGroup>
                        <ListGroup.Item key='shippingAddress'>
                            <h4>Shipping Address</h4>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.country}
                            <p>{shippingAddress.postalCode}</p>
                        </ListGroup.Item>

                        <ListGroup.Item key='payment'>
                            <h4>Payment Method</h4>
                            {paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item key='cart'>
                            <h4>Cart Items</h4>
                            <ListGroup variant='flush'>
                                { cart_items.map((x) => (
                                    <ListGroup.Item key={x.product}>
                                        <Row>
                                            <Col md={2}>
                                               <Card>
                                                 <img src={ x.image } alt={x.name}/>
                                               </Card>
                                            </Col>
                                            <Col>
                                                <strong style={{fontSize:'20px'}}>{ x.name }</strong>
                                            </Col>
                                            <Col>
                                                <p>&#8377; {x.price}</p>
                                            </Col>
                                            <Col>
                                            <p>&#8377; {x.price} x <Badge>{ x.qnty }</Badge> = &#8377; {x.price*x.qnty}
                                            </p>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    { error && <Message variant="danger">{ error }</Message> }
                    <ListGroup className="mx-5">
                        <ListGroup.Item key='0'>
                            <Row>
                                <Col>
                                    <h4>Order Summary</h4>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item key='1'>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'20px'}}>
                                        <Badge>{ itms }</Badge> Items:
                                    </strong>
                                </Col>
                                <Col>
                                    <p>&#8377; { cart.price }</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item key='2'>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'20px'}}>
                                        Shipping:
                                    </strong>
                                </Col>
                                <Col>
                                    <p>&#8377; { cart.shippingPrice }</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item key='3'>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'20px'}}>
                                        Tax:
                                    </strong>
                                </Col>
                                <Col>
                                    <p>&#8377; {cart.taxPrice}</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item key='4'>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'20px'}}>
                                        Total:
                                    </strong>
                                </Col>
                                <Col>
                                    <p>&#8377; { cart.totalPrice }</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item key='5'>
                            <Row>
                                <Col>
                                    <Button type='submit' variant='success' onClick={submitHandler}> Place Order </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
        </div>
    );
}
export default PlaceOrderScreen;
