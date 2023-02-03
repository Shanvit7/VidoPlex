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
    tagTypes:['watchHistoryData,likedTitlesData,watchListData'],
    endpoints:(builder)=>({
        addToWatchList: builder.mutation({
            query: (video) =>
            ({ url: '/add-to-watchlist', method: 'post', data:{addedVideo:video,accessToken:Cookies.getItem('access-token')}}),
             invalidatesTags:['watchListData']
        }),
        myWatchList: builder.query({
          query: () =>
          ({ url: '/my-watchlist', method: 'post', data:{accessToken:Cookies.getItem('access-token')}}),
          providesTags:['watchListData']
        }),
        removeFromWatchList: builder.mutation({
          query: (videoId) =>
          ({ url: '/remove-from-watchlist', method: 'post', data:{videoId:videoId,accessToken:Cookies.getItem('access-token')}}),
          invalidatesTags:['watchListData']
        }),
        likeTheTitle: builder.mutation({
          query:(video)=>
          ({ url: '/like-the-title', method: 'post', data:{addedVideo:video,accessToken:Cookies.getItem('access-token')}}),
          invalidatesTags:['likedTitlesData']
        }),
        removeFromLiked: builder.mutation({
          query:(videoId)=>
          ({ url: '/remove-from-liked-titles', method: 'post', data:{videoId:videoId,accessToken:Cookies.getItem('access-token')}}),
          invalidatesTags:['likedTitlesData']
        }),
        likedTitles:builder.query({
          query:()=>
          ({ url: '/my-liked-titles', method: 'post', data:{accessToken:Cookies.getItem('access-token')}}),
          providesTags:['likedTitlesData']
        }),
        myWatchHistory:builder.query({
          query:()=>
          ({ url: '/watch-history', method: 'post', data:{accessToken:Cookies.getItem('access-token')}}),
          providesTags:['watchHistoryData'],
        }),
        updateMyWatchHistory:builder.mutation({
          query:(video)=>
          ({url: '/update-watch-history', method: 'post', data:{addedVideo:video,accessToken:Cookies.getItem('access-token')}}),
          invalidatesTags:['watchHistoryData'],
        }),
  }),
})

export const { 
  useAddToWatchListMutation,
  useMyWatchListQuery,
  useRemoveFromWatchListMutation,
  useLikeTheTitleMutation,
  useLikedTitlesQuery,
  useRemoveFromLikedMutation,
  useMyWatchHistoryQuery,
  useUpdateMyWatchHistoryMutation,
 } = userApi;