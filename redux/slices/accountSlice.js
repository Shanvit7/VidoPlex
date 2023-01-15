import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookies';
import axios from 'axios';
import { jwtVerify }from "jose";


const KEY = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET,
)
  
export const getUser = createAsyncThunk(
    'authorization/getUser',
    async(thunkAPI)=>{
        const token = Cookies.getItem('access-token');
        try {
            const {payload} = await jwtVerify(token,KEY);
            const response = await axios.post('api/getUser',payload)
            .catch((err)=>{
                throw err.response.data;
            })
            return response.data;
        } catch(e){
            console.log(e);
        }
    }

)


const initialState = {
    account:'',
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
})


export const {} = accountSlice.actions;

export default accountSlice.reducer;