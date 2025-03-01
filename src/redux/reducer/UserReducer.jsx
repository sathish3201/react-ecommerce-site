import { createSlice } from "@reduxjs/toolkit"

const initialState= {
    user_detail:null
}

console.log(initialState);
const UserReducer = createSlice({
    name : 'UserReducer',
    initialState,
    reducers : {
        add_user : (state, action) =>{
            state.user_detail = action.payload;
        },
        remove_user :(state, action) =>{
            state.user_detail = null;
        }
    }
})
export const {add_user, remove_user} = UserReducer.actions;
export default UserReducer.reducer;