import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser=createAsyncThunk(
    'authorization/registerUser',
    async(thunkAPI)=>{
         const {email,password}=thunkAPI;
         const response = await axios.post('api/register-user',{email:email,password:password})
         .catch((err)=>{
            throw err.response.data;
        })
         return response.data;
      }
);

export const loginUser = createAsyncThunk(
    'authorization/loginUser',
    async(thunkAPI)=>{
        const {email,password}= thunkAPI;
        const response = await axios.post('api/login-user',{email:email,password:password})
        .catch(((err)=>{
            throw err.response.data;
        }))
        return response.data;
    }
)

const initialState = {}

export const authSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {}, 
})

export const {} = authSlice.actions;

export default authSlice.reducer;