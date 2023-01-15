import { createApi } from '@reduxjs/toolkit/query/react';
import { gql, ClientError, request } from 'graphql-request';

const graphqlBaseQuery =
  ({ baseUrl }) =>
  async ({ body }) => {
    try {
      const result = await request(baseUrl, body)
      return { data:result}
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } }
      }
      return { error: { status: 500, data: error } }
    }
  }

export const videoApi = createApi({
    reducerPath:'videoApi',
    baseQuery: graphqlBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            headers.set("Authorization",process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN)
            return headers
        }
    }),
    endpoints:(builder)=>({
        getVideo:builder.query({
            query:(id)=>({
                body:gql`
                query{
                    videos(where:{id:"${id}"}){
                      title,
                      id,
                      description,
                      thumbnail{
                        url
                      },
                      mp4{
                        url
                      }
                    }
                  }
                `
            }),
        transformResponse:(response) => response.videos[0],
        })
    })
})

export const { useGetVideoQuery } = videoApi;