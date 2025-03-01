import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productValues : [],
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
    }
})

export const {incrementProduct, decrementProduct} = ProductReducer.actions;
export default ProductReducer.reducer