import React, { useState, useEffect } from "react";
import { Table, Button, Container,Image, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { orderList } from "../actions/orderActions";
//import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function OrderListScreen() {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const history = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { error, loading, products } = productList;

    const ordersList = useSelector((state) => state.orderList);
    const { error:errorNew, loading:loadingNew, orders } = ordersList;

    useEffect(()=>{
        if(!userInfo.isAdmin){
            history('/login');
        }
        else{
            dispatch(orderList());
        }
    }, [dispatch, history, userInfo]);

    function createProductHandler(product){
//        history('/product/create');
    }
    console.log(orders);
    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h2>Orders</h2>
                </Col>
            </Row>
            {loadingNew && <Loader />}
            {errorNew && <Message>{errorNew}</Message>}
            { error && <Message variant="danger">{ error }</Message> }
            <Table striped responsive hover bordered className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Order Items</th>
                        <th>Price</th>
                        <th>Paid</th>
                        <th>Shipping</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { orders ? (
                         orders.map((x) => (
                            <tr key={x._id}>
                                <td>{x._id}</td>
                                <td>{x.user && x.user.username}</td>
                                <td>{x.orderItems.length}</td>
                                <td>{x.total_price}</td>
                                <td>{ x.is_paid ? <span>{x.paid_at.substring(0, 10)}<br/> {x.payment_method}</span> : <i className="fas fa-times" style={{color: 'red'}}></i> }</td>
                                <td>{x.shipping.address}{x.shipping.city},{x.shipping.country}<br/>{x.shipping.postal_code}</td>
                                <td>{x.is_delivered ? <span><i className="fas fa-check" style={{color: 'green'}}></i> {x.delivered_at.substring(0, 10)}<br/> </span> : <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                <td>
                                    <Link to={`/order/${x._id}`}>
                                        <Button className="btn-sm" variant="outline-secondary">
                                            <i className="fas fa-info-circle"></i> Details
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                        )
                    : <Loader />
                    }
                    </tbody>
            </Table>
        </Container>
    );
}
export default OrderListScreen;
