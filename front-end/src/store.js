import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailReducer, productUpdateReducer, productDeleteReducer, productCreateReducer, productCreateReviewReducer, topProductListReducer } from "./reducers/productReducer";
import { cartListReducer } from "./reducers/cartReducer";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userListReducer,
         userDeleteReducer,userUpdateProfileReducer } from "./reducers/userReducer";
import { orderCreateReducer, orderDetailReducer, orderPaymentReducer, orderMyListReducer, orderListReducer, orderDeliverReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productCreate:productCreateReducer,
  productDetail: productDetailReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  topProductList: topProductListReducer,
  cartList: cartListReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,

  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPayment: orderPaymentReducer,
  orderDeliver: orderDeliverReducer,
  myOrderList: orderMyListReducer,
  orderList: orderListReducer,

  createReview: productCreateReviewReducer,
});

const cart_items_from_storage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []
const user_info_from_storage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
const shipping_address_from_storage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}
const payment_method_from_storage = localStorage.getItem('PaymentMethod') ? JSON.parse(localStorage.getItem('PaymentMethod')): {}

const initalState = {
    cartList: { cartItems: cart_items_from_storage, shippingAddress: shipping_address_from_storage,
    paymentMethod: payment_method_from_storage, },
    userLogin: { userInfo: user_info_from_storage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
