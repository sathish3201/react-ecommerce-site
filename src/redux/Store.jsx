import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './reducer/CartReducer';
import UserReducer from './reducer/UserReducer';
import OrderReducer from './reducer/OrderReducer';
import ProductReducer from './reducer/ProductReducer';

const Store = configureStore({
    reducer :{
        user: UserReducer,
        cart : CartReducer,
        orders: OrderReducer,
        products: ProductReducer,  
    },
});

export default Store