import { CART_ADD_ITEM, CART_REMOVE_ITEM, SHIPPING_ADDRESS_ADD, PAYMENT_METHOD_ADD, CART_CLEAR } from '../constants/cartConstants';

export const cartListReducer = (state = {cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const cartItems = state.cartItems ? state.cartItems : state;
            const existItem = cartItems.find(x => x.product === item.product)
            if(existItem){
                return { ...state, cartItems: cartItems.map( x => x.product === existItem.product ? item : x ) };
            }
            else{ return { ...state, cartItems: [...cartItems, item] };
        }
        case CART_REMOVE_ITEM:
            const cart_items = state.cartItems ? state.cartItems : state;
            console.log(cart_items);
            return {...state, cartItems: cart_items.filter(x => x.product !== action.payload)}
        case SHIPPING_ADDRESS_ADD:
            return { ...state, shippingAddress: action.payload }
        case PAYMENT_METHOD_ADD:
            return { ...state, paymentMethod: action.payload }
        case CART_CLEAR:
            return { ...state, cartItems: [] }
        default:
            return state;
    }
};