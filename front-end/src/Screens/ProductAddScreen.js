import React, { useState,useEffect } from "react";
import { Form, Button, Container,Image,InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from '../actions/productActions'

function ProductAddScreen(){
    const { id } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('shop.png');

    const dispatch = useDispatch();
    const history = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productUpdate = useSelector((state) => state.productCreate);
    const { error:errorAdd, loading:loadingAdd, success:successAdd } = productUpdate;
    console.log(userInfo);
    useEffect(()=>{
        if(!userInfo.name){
            history('/login');
        }
    },[history,userInfo]);
    function submitHandler(e){
        e.preventDefault();
        dispatch(createProduct({
            'name': name,
            'price': price,
            'brand': brand,
            'category': category,
            'stock': stock,
            'desc': desc,
            'image': imageName,
        }));
        history('/productlist');
    }
    function imageHandler(val){
        val = val.split("\\")[2];
        setImageName(val);
//        setImage(val);
    }
    return (
        <div>
            <Link to="/productlist">
                <Button>Go Back</Button>
            </Link>
            <FormContainer>
                <h2>Product</h2>
                { loadingAdd ? <Loader />
                : errorAdd ? <Message variant="danger">{ errorAdd }</Message>
                : (
                <Form  onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Pizza sauce'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='19.99'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Papa Joe'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='brand'>
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='JIFFY'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='stock'>
                        <Form.Label>In Stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='18'
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="file" size="sm" onChange={(e) => imageHandler(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId='image-pic'>
                        <InputGroup>
                        <InputGroup.Text id="basic-addon3">
                            /image/
                        </InputGroup.Text>
                        <Form.Control
                            type='text'
                            placeholder='xyz.png'
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                            disabled readOnly
                        ></Form.Control>
                        <Image src={image} alt={name} width="100" fluid rounded />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId='desc'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as='textarea'
                            placeholder='lorem posum'
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Button type='submit' variant='success'><i className='fas fa-plus'></i> Add </Button>
                </Form>
                )}
            </FormContainer>
        </div>
    );
}
export default ProductAddScreen;
