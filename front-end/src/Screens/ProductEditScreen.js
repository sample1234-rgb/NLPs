import React, { useState,useEffect } from "react";
import { Form, Button, Container,Image,InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail, updateProduct } from "../actions/productActions";
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants';
//import { orderMyList } from '../actions/orderActions';

function ProductEditScreen() {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [imageName, setImageName] = useState('');

    const dispatch = useDispatch();
    const history = useNavigate();

    const productDetail = useSelector((state) => state.productDetail);
    const { error, loading, product } = productDetail;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate;

//    var userOrders = useSelector((state) => state.myOrderList);
//    var { loading:loadingOrders, error: errorOrders, orders } = userOrders;

    useEffect(() => {
            if(successUpdate){
                dispatch({ type: PRODUCT_DETAILS_RESET });
                history('/productlist');
            }
            else{
                if(!product.name){
                    dispatch(listProductDetail({id}))
                }
                else{
                    setName(product.name);
                    setPrice(product.price);
                    setBrand(product.brand);
                    setCategory(product.category);
                    setStock(product.count_in_stock);
                    setImage(product.image);
                    setImageName(product.image? product.image.split('/')[2]:'');
                }
            }
    }, [dispatch,successUpdate,product])

    function submitHandler(e){
        e.preventDefault();
        dispatch(updateProduct({
            'id': product._id,
            'name': name,
            'price': price,
            'brand': brand,
            'category': category,
            'stock': stock,
            'image': imageName,
        }));
        history('/productlist');
    }
    function imageHandler(val){
        val = val.split("\\")[2];
        setImageName(val);
        console.log(val);
//        setImage(val);
    }
    return (
        <div>
            <Link to="/productlist">
                <Button>Go Back</Button>
            </Link>
            <FormContainer>
                <h2>Product</h2>
                { loading ? <Loader />
                : error ? <Message variant="danger">{ error }</Message>
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
                    <br />
                    <Button type='submit' variant='success'> Update </Button>
                </Form>
                )}
            </FormContainer>
        </div>
    );
}
export default ProductEditScreen;
