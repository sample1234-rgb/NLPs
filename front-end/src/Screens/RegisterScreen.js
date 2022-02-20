import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;
    const loc  = useLocation();
    const redirect = loc.search ? loc.search.split("=")[1] : '/';

    function submitHandler(e){
        e.preventDefault();
        if(password === confirmPassword){
            dispatch(register(name,email,password));
            console.log('Submitted');
        }
        else{ setMessage('Passwords do not match'); }
    }
  return (
        <FormContainer>
            <h2>User Register</h2>
            { error && <Message variant="danger">{ error }</Message> }
            { message !== '' && <Message variant="danger">{ message }</Message> }
            { loading && <Loader /> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                        type='name'
                        required
                        placeholder='Joe Doe'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control
                        type='email'
                        required
                        placeholder='joe@joe.joe'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Your Password</Form.Label>
                    <Form.Control
                        type='password'
                        required
                        placeholder='••••••••'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        required
                        placeholder='••••••••'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <br/>
                <Button type='submit' variant='success'> Register </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already a user ?<Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
  );
}
export default RegisterScreen;
