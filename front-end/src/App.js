import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import TablesScreen from "./Screens/TablesScreen";
import OrgScreen from "./Screens/OrgScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import UserScreen from "./Screens/UserScreen";
import OrderScreen from "./Screens/OrderScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";

import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import ProductAddScreen from "./Screens/ProductAddScreen";
import OrderListScreen from "./Screens/OrderListScreen";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
    return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomeScreen />}/>
            /*------------------------- Product Links -----------------------*/
            <Route path="/products" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />}/>
            <Route path="/product/edit/:id" element={<ProductEditScreen />} />
            <Route path="/product/create" element={<ProductAddScreen />} />
            <Route path="/productlist" element={<ProductListScreen />} /> /*  Admin Page */
            /*------------------------- Services Links -----------------------*/
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/tables/" element={<TablesScreen />} />
            /*------------------------- User Links -----------------------*/
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<UserScreen />} />
            <Route path="/userlist" element={<UserListScreen />} /> /* Admin Page */
            <Route path="/user/edit/:id" element={<UserEditScreen />} />
            /*------------------------- Order Links -----------------------*/
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderlist" element={<OrderListScreen />} /> /* Admin Page */
            /*------------------------- Misc Links -----------------------*/
            <Route path="/tnc" element={<OrgScreen />} />
        </Routes>
        <Footer />
    </Router>
    );
}