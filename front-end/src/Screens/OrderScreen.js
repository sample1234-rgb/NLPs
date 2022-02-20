import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { PayPalButton } from 'react-paypal-button-v2';
import { Link,useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from "react-redux";
import { orderDetails, orderPayment, orderDeliver } from '../actions/orderActions';
import { ORDER_PAYMENT_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

function OrderScreen() {
    const { id } = useParams();
    var itms = 0;
    const [SdkReady, setSdkReady] = useState(false);

    const orderD = useSelector(state => state.orderDetail);
    const { loading, order, error } = orderD

    const orderPay = useSelector(state => state.orderPayment);
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDelr = useSelector(state => state.orderDeliver);
    const { loading: loadingDelr, success: successDelr } = orderDelr

    const orderLogin = useSelector(state => state.userLogin);
    const { userInfo } = orderLogin

    const dispatch = useDispatch();

    if(!loading && !error){
        order.price = Number(order.orderItems.reduce((acc,x) =>  acc + (x.price*x.quantity), 0 ).toFixed(2));
        itms = Number(order.orderItems.reduce((acc,x) =>  acc + x.quantity, 0 ));
    }
    function PaymentScript(){
        //  const CLIENT_ID = ARsm1eTWQ-nZ-YEoWxOYKOovozNIFnavq0fL4Bfj45TrdgXOzYFjw6-oCXLJDV3dEaFY2xDcqSnqrt9K
        const script = document.createElement('script');
        script.type = 'text/javaScript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AetitKkxlgnyyzojwl6zdu5vLB9ZgFrp9V-x2leYOn_RAYgxgk5x5GmYEChgulrafS5zHEvBL8nivFvZ';
        script.async = true;
        script.onload = () => { setSdkReady(true) };
        document.body.appendChild(script);
    }
    useEffect(()=>{
        if(!order || successPay || order._id !== Number(id) || successDelr){
            dispatch({ type: ORDER_PAYMENT_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(orderDetails({id}));
        }
        else if(!order.is_paid){
            if(!window.paypal){
                PaymentScript();
            }
            else{
                setSdkReady(true);
            }
        }
    },[dispatch, order, id, successPay, PaymentScript, setSdkReady, successDelr])

    const order_id = id;
    function submitHandler(id, payment){
        id = order_id;
        dispatch(orderPayment({id}, payment));
    }

    function deliverHandler(){
        dispatch(orderDeliver(order));
        console.log('Deliver');
    }

    return loading ? (
        <Loader />
        ) : error ? (
            <Message>{error}</Message>
        ) : (
        <div>
        <Container>
        <h2>Orders: </h2>
            <Row>
                <Col md={6}>
                    <ListGroup>
                        <ListGroup.Item key='shippingAddress'>
                            <h4>Shipping Address</h4>
                            { order.is_delivered ? (
                                <Message variant='success'>Delivered on: {order.delivered_at}</Message>
                                ): (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                            <p>{order.user.name} | {order.user.email}</p>
                            {order.shipping.address}, {order.shipping.city}, {order.shipping.country}
                            <p>{order.shipping.postal_code}</p>
                        </ListGroup.Item>

                        <ListGroup.Item key='payment'>
                            <h4>Payment Method</h4>
                            {order.payment_method}
                            <br/>
                            { order.is_paid ? (
                                <Message variant='success'> Paid on: {order.paid_at}</Message>
                                ): (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item key='order'>
                            <h4>Cart Items</h4>
                            <ListGroup variant='flush'>
                                { order.orderItems.map((x) => (
                                    <ListGroup.Item key={x.product}>
                                        <Row>
                                            <Col md={2}>
                                               <Card>
                                                 <img src={ x.image } alt={x.name}/>
                                               </Card>
                                            </Col>
                                            <Col>
                                                <strong style={{fontSize:'20px'}}>
                                                    <Link to={{pathName:`/product/${x.product}`}}>{ x.name }
                                                    </Link>
                                                </strong>
                                            </Col>
                                            <Col>
                                                <p>&#8377; {x.price}</p>
                                            </Col>
                                            <Col>
                                            <p>&#8377; {x.price} x <Badge>{ x.quantity }</Badge> = &#8377; {x.price*x.quantity}
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
                                    <p>&#8377; { order.price }</p>
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
                                    <p>&#8377; { order.shipping_price }</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item key='3'>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'20px'}}>
                                        Tax (18 %):
                                    </strong>
                                </Col>
                                <Col>
                                    <p>&#8377; { order.tax_price }</p>
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
                                    <p>&#8377; { order.total_price }</p>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        { userInfo && userInfo.is_admin && order.is_paid && !order.is_delivered && (
                          <ListGroup.Item>
                            <Button type='button' className='btn btn-block' onClick={deliverHandler}
                            > Mark as Delivered </Button>
                          </ListGroup.Item>
                        )}
                        { !order.is_paid && (
                        <ListGroup.Item key='5'>
                            {loadingPay && <Loader />}
                            {!SdkReady ? <Loader /> :(
                                <PayPalButton amount={order.total_price} onSuccess={submitHandler} />
                            )}
                        </ListGroup.Item>
                        )}
                        { userInfo && userInfo.isAdmin && order.is_paid && !order.is_delivered && (
                          <ListGroup.Item>
                            <Button type='button' className='btn btn-block' onClick={deliverHandler}
                            > Mark as Delivered </Button>
                          </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
        </div>
    );
}
export default OrderScreen;
