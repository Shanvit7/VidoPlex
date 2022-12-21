import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookie from 'js-cookie';

export const registerUser=createAsyncThunk(
    'authorization/registerProfile',
    async(thunkAPI)=>{
         const {email,password}=thunkAPI;
         const response = await axios.post('api/registerUser',{email:email,password:password});
         return response.data;
      }
);


const initialState = {
    Id:'',
}

export const authSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setId:(state,action)=>{
            state.Id= action.payload
        },
    }, 
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.Id = action.payload._id
        })

        .addCase(registerUser.rejected,(state,action)=>{
          state.Id = null 
        })
    }
})

export const {setId} = authSlice.actions;

export default authSlice.reducer;