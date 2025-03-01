import { createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../ecommerce/tools/AxiosInstance";


const initialState ={
    cartValues :[],
    total_price:parseInt(0),
}

const CartReducer = createSlice({
    name: "CartReducer",
    initialState,
    reducers : {
        add_to_cart: (state, action) =>{
            const itemidx = state.cartValues.findIndex((item) => item.product.id === action.payload.product.id)
            if(itemidx !== -1){
                alert(`${action.payload.product.title} already in cart`);
            }else if(action.payload.quantity <= 0){
                alert("quantity should be atleast one");
                return;
            }else { 
                state.total_price += parseInt(action.payload.product.price);
                state.cartValues.push(action.payload)
                
            }
            
        },
        remove_from_cart : (state, action) =>{
            state.cartValues = state.cartValues.filter(item => item.product.id !== action.payload.id);   
        },
        increment_item : (state, action) =>{
            const itemidx = state.cartValues.findIndex((item) => item.product.id === action.payload.id);
            if(state.cartValues[itemidx].quantity < state.cartValues[itemidx].product.stock){
            state.total_price += parseInt(state.cartValues[itemidx].product.price);
            state.cartValues[itemidx].quantity = state.cartValues[itemidx].quantity +1;
            
            }else{
                alert(`${state.cartValues[itemidx].product.title}should have quantity should less stock of ${state.cartValues[itemidx].product.stock}`)
                return;
            }
        },
       decrement_item : (state, action) => {
        const itemidx = state.cartValues.findIndex((item) => item.product.id === action.payload.id);
        state.total_price -= parseInt(state.cartValues[itemidx].product.price);
        state.cartValues[itemidx].quantity = state.cartValues[itemidx].quantity -1; 
        
        
       },
       remove_cart: (state, action) => {
        state.cartValues=[];
       },
        
    }
});

export const {add_to_cart, remove_from_cart, increment_item, decrement_item, remove_cart} = CartReducer.actions;
export default CartReducer.reducer;

