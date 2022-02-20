import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,

  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  
  TOP_PRODUCT_LIST_FAIL,
  TOP_PRODUCT_LIST_SUCCESS,
  TOP_PRODUCT_LIST_REQUEST,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = (keyword='') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/products/${keyword}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/products/top/');
    dispatch({ type: TOP_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOP_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};
export const listProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/products/${ id.id }`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail : error.message
    });
  }
};

export const deleteProduct = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const { userLogin: {userInfo},} = getState();
    const config = {
        headers: {
            'content-type': 'application/json',
             Authorization: `Bearer ${userInfo.token}`,
        }
    }
    await axios.delete(`/products/delete/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    });
  }
};

export const updateProduct = (product) => async (dispatch,getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
      const { userLogin: {userInfo},} = getState();
      const config = {
          headers: {
              'content-type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`,
          }
      }
      const { data } = await axios.put(`/products/update/${ product.id }/`, product, config);
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
      });
    }
  };

export const createProduct = (product) => async (dispatch,getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const { userLogin: {userInfo},} = getState();
      const config = {
          headers: {
              'content-type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`,
          }
      }
      const { data } = await axios.post('/products/add/', product, config);
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
      });
    }
  };

export const createReview = (review,id) => async (dispatch,getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_REQUEST });
      const { userLogin: {userInfo},} = getState();
      const config = {
          headers: {
              'content-type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`,
          }
      }
      const { data } = await axios.post(`/products/add/review/${ id.id }/`, review, config);
      dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
      });
    }
  };
