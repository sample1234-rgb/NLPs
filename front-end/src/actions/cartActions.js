import { CART_ADD_ITEM, CART_REMOVE_ITEM, SHIPPING_ADDRESS_ADD, PAYMENT_METHOD_ADD } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/products/${ id.id }`);
    dispatch({
     type: CART_ADD_ITEM,
        payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        count_in_stock: data.count_in_stock,
        qnty: qty,
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cartList.cartItems));
};
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cartList.cartItems));
};
export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: SHIPPING_ADDRESS_ADD,
        payload: data,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
      type: PAYMENT_METHOD_ADD,
      payload: data,
    });
    localStorage.setItem('PaymentMethod', JSON.stringify(data));
};