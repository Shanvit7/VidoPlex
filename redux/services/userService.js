import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import Cookies from 'js-cookies';

const KEY = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET,
)

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

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'http://localhost:3000/api',
    }),
    endpoints:(builder)=>({
        addToWatchList: builder.mutation({
            query: (videoId) =>
            ({ url: '/add-to-watchlist', method: 'post', data:{videoId:videoId,accessToken:Cookies.getItem('access-token')}}),
        }),
        myWatchList: builder.query({
          query: () =>
          ({ url: '/my-watchlist', method: 'post', data:{accessToken:Cookies.getItem('access-token')}}),
        }),
        removeFromWatchList: builder.mutation({
          query: (videoId) =>
          ({ url: '/remove-from-watchlist', method: 'post', data:{videoId:videoId,accessToken:Cookies.getItem('access-token')}}),
        }),
  }),
})

export const { useAddToWatchListMutation, useMyWatchListQuery,useRemoveFromWatchListMutation } = userApi;