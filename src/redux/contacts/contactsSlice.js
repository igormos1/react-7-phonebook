import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactApi = createApi({
  reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://627bc6f4a01c46a853253a19.mockapi.io/' }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        fetchContacts: builder.query({
            query: () => '/contacts/',
            providesTags: ['Contact']
        }),
        createContact: builder.mutation({
            query: ({ name, number}) => ({
                url: '/contacts',
                method: 'POST',
                body: {
                    name: name,
                    phone: number
                },
            }),
            invalidatesTags: ['Contact']
        }),
        deleteContacts: builder.mutation({
            query: (contactId) => ({
                url: `/contacts/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact']
        }),
      
    }),
})

export const { useFetchContactsQuery, useCreateContactMutation, useDeleteContactsMutation } = contactApi
