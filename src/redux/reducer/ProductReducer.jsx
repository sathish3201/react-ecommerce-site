import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../ecommerce/tools/AxiosInstance";

export const fetchProducts= createAsyncThunk(
    'product/fetchProducts',
    async(token, {rejectWithValue})=>{
        try{
            const axiosinstance = AxiosInstance(token);
            const response = await axiosinstance.get('api/products/');
            return response.data
        }catch(error){
            if(error.response){
                return rejectWithValue(error.response.data)

            }
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    productValues : [],
    loading:false,
    error:null
}

const ProductReducer = createSlice({
    name : "ProductReducer",
    initialState,
    reducers : {
        incrementProduct : (state, action) =>{
            state.productValues.push(action.payload);
        },
        decrementProduct : (state, action) =>{
            state.productValues = state.productValues.filter(item => item !== action.payload)
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchProducts.pending, (state)=>{
                state.loading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) =>{
                state.loading = false,
                state.productValues = action.payload;
                console.log("fetched Products Data: ",action.payload)
            })
            .addCase(fetchProducts.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.payload;
                console.log("fetched Error Products: ",action.payload)
            })
    }
})

export const {incrementProduct, decrementProduct} = ProductReducer.actions;
export default ProductReducer.reducer