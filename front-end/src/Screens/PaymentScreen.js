import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from '../actions/cartActions';

function PaymentScreen() {

    const cart = useSelector((state) => state.cartList);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const message = useState('');

    const dispatch = useDispatch();
    const history = useNavigate();
    useEffect(()=>{
        if(!shippingAddress.address){
            history('/shipping');
        }
    }, [history, shippingAddress])
    function submitHandler(e){
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history('/placeorder');
    }
    return (
        <FormContainer>
            <CheckOutSteps step={3} />
            <h2>Choose Payment Method</h2>
            { message !== '' && <Message variant="danger">{ message }</Message> }
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            checked
                            name='paymentMethod'
                            label='Paypal / Credit Card'
                            id='paypal'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                    <Col>
                        <Form.Check
                          type='radio'
                          name='paymentMethod'
                          label='Debit Card'
                          id='DebitCard'
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <br/>
                <Button type='submit' variant='success'> Continue </Button>
            </Form>
        </FormContainer>
    );
}
export default PaymentScreen;
