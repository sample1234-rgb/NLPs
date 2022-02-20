import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, Badge,Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
//import { addToCart, removeFromCart } from '../actions/cartActions';
import TimePicker from '../components/TimePicker';

function TablesScreen({ location }){
//  const { id } = useParams();
//  const loc  = useLocation();
//  const qty = loc ? Number(loc.search.split("=")[1]) : 1;
//  const dispatch = useDispatch();
//  const history = useNavigate();
    var time = new Date();
    const [visible,setVisible] = useState(false);
//  const cart = useSelector(state => state.cartList);
//  const cart_items = cart.cartItems ? cart.cartItems : cart;
//  const userLogin = useSelector((state) => state.userLogin);
//  const { userInfo } = userLogin;

//    useEffect(() => {
//        if(!userInfo){
//          history('/login');
//        }
//        dispatch(addToCart({id},qty));
//    }, [dispatch, id, qty, userInfo, history]);

//  function remove_from_cart(id){
//    dispatch(removeFromCart(id));
//  }
//  function checkOut(){
//      history(`/shipping`);
//  }
    function submitHandler(){
        if(visible)
            setVisible(true);
        else
            setVisible(false);
    }
  return (
    <div>
        <h2>Tables:</h2>
            <Row>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="/images/Date_Table.jpg" />
                        <Card.Title>Table of 2</Card.Title>
                        <Card.Body>
                            <Button variant="primary" onClick={submitHandler}>Book</Button>
                            { visible ? <TimePicker>{time}</TimePicker> : ''}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    Table of 2
                    <TimePicker>{time}</TimePicker>
                </Col>
                <Col>
                    Table of 2
                </Col>
                <Col>
                    Table of 2
                </Col>
            </Row>

            <Row>
                <Col>
                    Table of 4
                </Col>
                <Col>
                    Table of 4
                </Col>
                <Col>
                    Table of 4
                </Col>
                <Col>
                    Table of 4
                </Col>
            </Row>
            <Row>
                <Col>
                    Table of 6
                </Col>
                <Col>
                    Table of 6
                </Col>
                <Col>
                    Table of 6
                </Col>
                <Col>
                    Table of 6
                </Col>
            </Row>

            <Row>
                <Col>
                    Custom Tabling
                </Col>
            </Row>
    </div>
  );
}

export default TablesScreen;
