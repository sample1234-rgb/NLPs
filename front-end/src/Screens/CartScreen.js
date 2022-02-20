import React,{ useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, Badge,Button } from "react-bootstrap";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen({ location }){
  const { id } = useParams();
  const loc  = useLocation();
  const qty = loc ? Number(loc.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const history = useNavigate();

  const cart = useSelector(state => state.cartList);
  const cart_items = cart.cartItems ? cart.cartItems : cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo){
          history('/login');
        }
        dispatch(addToCart({id},qty));
    }, [dispatch, id, qty, userInfo, history]);

  function remove_from_cart(id){
    dispatch(removeFromCart(id));
  }
  function checkOut(){
      history(`/shipping`);
  }

  function updateQnty(id,op){
    const item = cart_items.find((x) => x.product === id);
    if(op){
        item.qnty -= 1;
    }
    else{
        item.qnty += 1;
    }
  }

  return (
    <div>
        <h2>Cart Screen:</h2>
            <Row>
                <Col md={8}>
                    { cart_items.length === 0 ? <Message variant="warning">
                        Your Cart Is Empty :/, Wanna buy products <Link to="/products/">Home</Link>
                    </Message> : (
                    <ListGroup className="mx-5 my-3">
                        { cart_items.map((x) => (
                            <ListGroup.Item key={x.product}>
                                <Row>
                                    <Col>
                                        <strong style={{fontSize:'20px'}}>
                                            <Link to={{pathName: `/product/${ x.product }`}}>{ x.name }</Link>
                                        </strong>
                                        <p>&#8377; {x.price}</p>
                                        <p>
                                            { x.count_in_stock ? <b style={{ color: "green" }}>Stock</b>  : (
                                            <b
                                              style={{
                                                textDecorationLine: "line-through",
                                                color: "red"
                                              }}
                                            >
                                              Stock
                                            </b>
                                        )}
                                        </p>
                                        Quantity
                                        <div style={{background:'#f8f9fa',width:'fit-content',borderRadius:'5px'}}>
                                        <Button variant="outline-dark" onClick={()=>updateQnty(x.product,1)}>-</Button>
                                            <span className='mx-3'>{ x.qnty }</span>
                                        <Button variant="outline-dark" onClick={()=>updateQnty(x.product,0)}>+</Button>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                      <Card>
                                        <img src={ x.image } alt={ x.product }/>
                                      </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <a href="#" style={{ margin:'0px 5px' }}>Save for later</a>
                                        <Button variant="outline-danger" onClick={() => remove_from_cart(x.product)}
                                        >Remove</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <Link to="/products/">Add more items</Link>
                        </ListGroup.Item>
                    </ListGroup>
                    )}
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h4>Sub Total: <Badge bg="secondary">
                                { cart_items.reduce((acc,x) =>  acc + x.qnty, 0 )}
                                </Badge> Items</h4>
                            Price: &#8377; { cart_items.reduce((acc,x) =>  acc + (x.price*x.qnty), 0 ).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" disabled={ cart_items.length === 0 } onClick={checkOut}
                            > Checkout &rarr; </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
    </div>
  );
}

export default CartScreen;
