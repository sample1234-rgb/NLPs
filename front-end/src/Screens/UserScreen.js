import React, { useState,useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Badge,Table } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { userDetails, userDetailsUpdate } from "../actions/userActions";
import { USER_UPDATE_RESET } from '../constants/userConstants';
import { orderMyList } from '../actions/orderActions';

function UserScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const history = useNavigate();

    const userDetail = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userprofileUpdate = useSelector((state) => state.userUpdate);
    const { success } = userprofileUpdate;

    var userOrders = useSelector((state) => state.myOrderList);
    var { loading:loadingOrders, error: errorOrders, orders } = userOrders;
    console.log(orders);

    useEffect(() => {
        if(!userInfo){
            history('/login');
        }
        else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type: USER_UPDATE_RESET});
                dispatch(userDetails('profile'));
                dispatch(orderMyList());
            }
            else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, success])
    function submitHandler(e){
        e.preventDefault();
        if(password === confirmPassword){
            dispatch(userDetailsUpdate({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }));
            setMessage('');
        }
        else{ setMessage('Passwords do not match'); }
    }

    return (
        <Container className='mx-5 my-2'>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    { error && <Message variant="danger">{ error }</Message> }
                    { message !== '' && <Message variant="danger">{ message }</Message> }
                    { loading && <Loader /> }
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Your Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Joe Doe'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Your Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='joe@joe.joe'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Your Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='••••••••'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='••••••••'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <br/>
                        <Button type='submit' variant='success'> Update </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>Your Orders</h2>
                    <ListGroup variant='flush'>
                    </ListGroup>
                        { loadingOrders ? (<Loader />)
                        : errorOrders && (<Message >{errorOrders}</Message>)}
                        { orders &&
                         (<Table striped responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { orders.map((x) => (
                                        <tr key={x._id}>
                                            <td>{x._id}</td>
                                            <td>{x.created_at.split('T')[0]} {x.created_at.split('T')[1].split('.')[0]}</td>
                                            <td>&#8377; {x.total_price.split('.')[0]}<sup>{x.total_price.split('.')[1]}</sup></td>
                                            <td>{x.is_paid ? <Badge bg="success">paid</Badge> :<Badge bg="danger">Not paid</Badge>}</td>
                                            <td>{x.is_delivered ? <Badge bg="success">Delivered</Badge> :<Badge bg="danger">Not Delivered</Badge>}</td>
                                            <td>
                                                <Link to={`/order/${x._id}`}>
                                                    <Button className="btn-sm">Details</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>)
                        }
                </Col>
            </Row>
        </Container>
    );
}
export default UserScreen;
