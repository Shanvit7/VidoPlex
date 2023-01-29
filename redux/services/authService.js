import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'api',
    }),
    endpoints:(builder)=>({
          registerUser: builder.mutation({
            query: (dataParams) => ({ url: '/auth/register-user', method: 'post', data: dataParams}),
        }),
         loginUser: builder.mutation({
            query: (dataParams) => ({ url: '/auth/login-user', method: 'post', data: dataParams}),
        }),
    }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;