import React, { useState,useEffect } from "react";
import { Form, Button} from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { userDetails, userUpdateById } from "../actions/userActions";
import { USER_UPDATE_RESET } from '../constants/userConstants';
//import { orderMyList } from '../actions/orderActions'; USER_DETAILS_RESET

function UserEditScreen() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState(false);

    const dispatch = useDispatch();
    const history = useNavigate();

    const userDetail = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { error:errorUpdate, loading:loadingUpdate,success:successUpdate } = userUpdate;

    var userOrders = useSelector((state) => state.myOrderList);
    var { loading:loadingOrders, error: errorOrders, orders } = userOrders;

    useEffect(() => {
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET });
//            dispatch({ type: USER_DETAILS_RESET });
            history('/userlist');
        }
        else{
            if(!user.name || user._id !== Number(id)){
                dispatch(userDetails({id}))
            }
            else{
                setName(user.name);
                setEmail(user.email);
                setAdmin(user.isAdmin);
            }
        }
    }, [dispatch,id,successUpdate,dispatch])

    function submitHandler(e){
        e.preventDefault();
        dispatch(userUpdateById({
            'id': user._id,
            'name': name,
            'email': email,
            'isAdmin': admin,
        }));
//        history('/userlist');
    }

    return (
        <div>
            <Link to="/userlist">
                <Button>Go Back</Button>
            </Link>
            <FormContainer>
                <h2>User Profile</h2>
                { loading ? <Loader />
                : error ? <Message variant="danger">{ error }</Message>
                : (
                <Form  onSubmit={submitHandler}>
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
                    <br/>
                    <Form.Group controlId='admin'>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Admin"
                            checked={admin}
                            onChange = {(e) => setAdmin(e.target.checked)}
                          />
                    </Form.Group>
                    <br/>
                    <Button type='submit' variant='success'> Update </Button>
                </Form>
                )}
            </FormContainer>
        </div>
    );
}
export default UserEditScreen;
