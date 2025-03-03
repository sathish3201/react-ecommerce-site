import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../ecommerce/tools/AxiosInstance";
import axios from "axios";

//  getting orders
export const fetchOrders= createAsyncThunk('orders/FetchOrders',
    async(token,{rejectWithValue}) =>{
        
        try{
        const axiosinstance = AxiosInstance(token)
        const response = await axiosinstance.get('/orders/');
        return response.data
        }catch(error){
            if(error.response){
                return rejectWithValue(error.response.data)
            }
            return rejectWithValue(error.message || "failed to Fetch orders");
        }

    }
);
// deleting order
export const deleteOrder=createAsyncThunk('orders/deleteOrder',
    async ({id, token},{rejectWithValue}) =>{
        try{
            const axiosinstance = AxiosInstance(token);
            const response = await axiosinstance.delete(`/orders/${id}/`);
            return response.data;
        }catch(error){
            if(error.response){
                return rejectWithValue(error.response.data)
            }
            return rejectWithValue(error.message || "failed to delete Order")
        }
    }
)

const initialState = {
    orderValues :[],
    loading:false,
    error :null,
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
        add_orders_from_api:(state, action) =>{
            state.orderValues = action.payload;
        }
    },
    extraReducers: (builder) =>{
        builder
        // fetch orders
            .addCase(fetchOrders.pending, (state) =>{
                state.loading= true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) =>{
                state.loading = false;
                state.orderValues = action.payload;
                console.log('Orders fetched: ', action.payload)
            })
            .addCase(fetchOrders.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.payload;
                console.log('Fetched: ', action.payload)
            })
            // deleted order
            .addCase(deleteOrder.pending, (state)=>{
                state.loading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action)=>{
                state.loading = false;
                console.log("Deleted successfull", action.payload)
                Alert(`Deleted Successfull: ${action.payload}`)
                window.location.reload()
            })
            .addCase(deleteOrder.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
                console.log('Error in Deleting : ',action.payload)
                Alert(`Error in Deleting order: ${action.payload}`)
            })

    },

});

export const {incrementorder, decrementorder, add_orders_from_api} = OrderReducer.actions;
export default OrderReducer.reducer;

