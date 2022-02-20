import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,

  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_REQUEST,

  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_RESET,

  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,

  ORDER_MYLIST_FAIL,
  ORDER_MYLIST_SUCCESS,
  ORDER_MYLIST_REQUEST,
  ORDER_MYLIST_RESET,

  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
} from "../constants/orderConstants";
import { CART_CLEAR } from "../constants/cartConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { userLogin: {userInfo},} = getState();
        const config = { headers: {'content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`} };
        const { data } = await axios.post('/order/add/', order, config);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_CLEAR, payload: data });
        localStorage.removeItem('cartItems');
    }
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message
    });
    }
};

export const orderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST });
        const { userLogin: {userInfo},} = getState();
        const config = { headers: {'content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`} };
        const { data } = await axios.get(`/order/${id.id}/`, config);
        dispatch({ type: ORDER_DETAIL_SUCCESS, payload:data });
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message
    });
    }
};

export const orderPayment = (id, payment) => async (dispatch, getState) => {
      try {
          dispatch({ type: ORDER_PAYMENT_REQUEST });

          const { userLogin: {userInfo},} = getState();
          const config = { headers: {'content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`} };
          const { data } = await axios.put(`/order/${id.id}/pay/`, payment, config);
          dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: data });
      }
      catch (error) {
          dispatch({
              type: ORDER_PAYMENT_FAIL,
              payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
      });
      }
};

export const orderMyList = () => async (dispatch, getState) => {
  try {
      dispatch({ type: ORDER_MYLIST_REQUEST });
      const { userLogin: {userInfo},} = getState();
      const config = { headers: {'content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`} };
      const { data } = await axios.get(`/order/myOrders/`, config);
      dispatch({ type: ORDER_MYLIST_SUCCESS, payload: data });
  }
  catch (error) {
      dispatch({
          type: ORDER_MYLIST_FAIL,
          payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
  });
  }
};

export const orderList = () => async (dispatch, getState) => {
  try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const { userLogin: {userInfo},} = getState();
      const config = { headers: {'content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`} };
      const { data } = await axios.get(`/order/`, config);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  }
  catch (error) {
      dispatch({
          type: ORDER_LIST_FAIL,
          payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
  });
  }
};

export const orderDeliver = (order) => async (dispatch, getState) => {
      try {
          dispatch({ type: ORDER_DELIVER_REQUEST });
          const { userLogin: {userInfo},} = getState();
          const config = { headers: {'content-type': 'application/json', Authorization: `Bearer ${userInfo.token}`} };
          const { data } = await axios.put(`/order/${order._id}/ship/`, {}, config);
          dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
      }
      catch (error) {
          dispatch({
              type: ORDER_DELIVER_FAIL,
              payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
      });
      }
};
