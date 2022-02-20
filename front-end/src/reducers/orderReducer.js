import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_RESET,
  ORDER_MYLIST_FAIL,
  ORDER_MYLIST_SUCCESS,
  ORDER_MYLIST_REQUEST,
  ORDER_MYLIST_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
//  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
export const orderDetailReducer = (state = { loading:true, orderItems:[], shippingAddress:{} }, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAIL_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const orderPaymentReducer = (state = {}, action) => {
      switch (action.type) {
          case ORDER_PAYMENT_REQUEST:
              return { loading: true };
          case ORDER_PAYMENT_SUCCESS:
              return { loading: false, success: true };
          case ORDER_PAYMENT_FAIL:
              return { loading: false, error: action.payload };
          case ORDER_PAYMENT_RESET:
              return {};
          default:
              return state;
      }
  };
export const orderMyListReducer = (state = { orders:[]}, action) => {
  switch (action.type) {
      case ORDER_MYLIST_REQUEST:
          return { loading: true };
      case ORDER_MYLIST_SUCCESS:
          return { loading: false, orders: action.payload };
      case ORDER_MYLIST_FAIL:
          return { loading: false, error: action.payload };
      case ORDER_MYLIST_RESET:
          return { orders: [] };
      default:
          return state;
  }
};

export const orderListReducer = (state = { orders:[] }, action) => {
  switch (action.type) {
      case ORDER_LIST_REQUEST:
          return { loading: true };
      case ORDER_LIST_SUCCESS:
          return { loading: false, orders: action.payload };
      case ORDER_LIST_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

export const orderDeliverReducer = (state = { orders:[] }, action) => {
  switch (action.type) {
      case ORDER_DELIVER_REQUEST:
          return { loading: true };
      case ORDER_DELIVER_SUCCESS:
          return { loading: false, orders: action.payload };
      case ORDER_DELIVER_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};