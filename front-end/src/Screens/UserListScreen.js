import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listOfUsers, userDelete } from "../actions/userActions";

function UserListScreen() {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const history = useNavigate();

    const userList = useSelector((state) => state.userList);
    const { error, loading, users } = userList;

    const userdelete = useSelector((state) => state.userDelete);
    const { loading:loadingDel, data } = userdelete;

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listOfUsers());
        }
        else{
            history('/login');
        }
   }, [dispatch, history]);

    function deleteHandler(id){
        if(window.confirm('Are you sure to delete this user?')){
            dispatch(userDelete(id));
        }
    };

    return (
        <Container>
            <h2>Users</h2>
            { error && <Message variant="danger">{ error }</Message> }
            <Table striped responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                { users ? (
                     users.map((x) => (
                        <tr key={x._id}>
                            <td>{x._id}</td>
                            <td>{x.username}</td>
                            <td>{x.name}</td>
                            <td>{x.email}</td>
                            <td>{x.isAdmin ? <i className="fas fa-check" style={{color: 'green'}}></i> : <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                            <td>
                                <Link to={`/user/edit/${x._id}`}>
                                    <Button className="btn-sm" variant="outline-secondary">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </Link>{'  '}
                                <Button className="btn-sm" variant="outline-danger" onClick={()=> deleteHandler(x._id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
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
export default UserListScreen;
