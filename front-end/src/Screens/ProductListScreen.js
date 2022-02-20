import React, { useState, useEffect } from "react";
import { Table, Button, Container,Image, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function ProductListScreen() {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const history = useNavigate();

    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page, pages } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { error:errorNew, loading:loadingNew, success } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { error:errorC, loading:loadingC, product, success:successC } = productCreate;

    const keyword = useLocation().search;

    useEffect(()=>{
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.isAdmin){
            history('/login');
        }
        else{
            dispatch(listProducts(keyword));
        }
   }, [dispatch, history, userInfo, success,keyword]);

    function deleteHandler(id){
        if(window.confirm('Are you sure to delete this product?')){
             dispatch(deleteProduct(id));
        }
    };

    function createProductHandler(product){
        history('/product/create');
    }

    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Add Product
                    </Button>
                </Col>
            </Row>
            {loadingNew && <Loader />}
            {errorNew && <Message>{errorNew}</Message>}
            { error && <Message variant="danger">{ error }</Message> }
            <div>
            <Table striped responsive hover bordered className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Ratings</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>In Stock</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { products ? (
                         products.map((x) => (
                            <tr key={x._id}>
                                <td>{x._id}</td>
                                <td><Image src={x.image} alt={x.name} width="100" fluid rounded/></td>
                                <td>{x.name}</td>
                                <td>{x.price}</td>
                                <td>{x.ratings}</td>
                                <td>{x.brand}</td>
                                <td>{x.category}</td>
                                <td>{x.count_in_stock ? <span><i className="fas fa-check" style={{color: 'green'}}></i> ({x.count_in_stock}) </span> : <i className="fas fa-times" style={{color: 'red'}}></i>}</td>
                                <td>
                                    <Link to={`/product/edit/${x._id}`}>
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
            <Paginate page={page} pages={pages} isAdmin={true}/>
            </div>
        </Container>
    );
}
export default ProductListScreen;
