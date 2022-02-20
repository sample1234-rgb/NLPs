import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from '../actions/cartActions';
import { countryList } from '../countries';

function ShippingScreen() {

    const cart = useSelector((state) => state.cartList);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const message = useState('');
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(()=>{
        if(!userInfo){
            history('/login');
        }
    },[history, userInfo])

    function submitHandler(e){
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        history('/payment');
    }
    return (
        <FormContainer>
            <CheckOutSteps step={2} />
            <h2>Shipping Address</h2>
            { message !== '' && <Message variant="danger">{ message }</Message> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Your Address</Form.Label>
                    <Form.Control
                        type='text'
                        required
                        placeholder='24 st., patel nagar'
                        value={ address ? address : '' }
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>Your City</Form.Label>
                    <Form.Control
                        type='text'
                        required
                        placeholder='New York City'
                        value={ city ? city : '' }
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Your Postal Code</Form.Label>
                    <Form.Control
                        type='number'
                        required
                        placeholder='ABCDEF'
                        value={ postalCode ? postalCode : '' }
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        as='select' value={country ? country:''} onChange={(e) => setCountry(e.target.value)}
                    >
                    <option hidden>--Select--</option>
                    { countryList.map((x) => (
                        <option key={x+1} value={x+1}>{ x }</option>
                       )) }
                    </Form.Control>
                </Form.Group>
                <br/>
                <Button type='submit' variant='success'> Save Address </Button>
            </Form>
        </FormContainer>
    );
}
export default ShippingScreen;
