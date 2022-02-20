import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    const loc  = useLocation();
    const redirect = loc.search ? loc.search.split("=")[1] : '/';

    useEffect(() => {
        if(userInfo){
            history(redirect);
        }
    }, [history, userInfo, redirect]);

    function submitHandler(e){
        e.preventDefault();
        console.log('Submitted');
        dispatch(login(email,password));
    }
  return (
        <FormContainer>
            <h2>User Login</h2>
            { error && <Message variant="danger">{ error }</Message> }
            { loading && <Loader /> }
            <Form onSubmit={submitHandler}>
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
                        placeholder='*******'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='success'> Login </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New User ?<Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
  );
}
export default LoginScreen;
