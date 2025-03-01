import { createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../ecommerce/tools/AxiosInstance";



const initialState = {
    orderValues :[],
}

const OrderReducer= createSlice({
    name : 'OrderReducer',
    initialState,
    reducers :{
        incrementorder :(state, action) =>{
            const orderidx = state.orderValues.findIndex((item) => item.orderid === action.payload.orderid)
            if(orderidx !== -1){
                alert("order already placed!!!")
                return;   
            }
          
            state.orderValues.push(action.payload)
        },
        decrementorder: (state, action) =>{
            state.orderValues = state.orderValues.filter(item => item !== action.payload)
        },
    }
})

export const {incrementorder, decrementorder} = OrderReducer.actions;
export default OrderReducer.reducer;

