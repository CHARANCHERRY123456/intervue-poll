import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL + "/api"
  }),
  endpoints: (builder) => ({
    createPoll: builder.mutation({
      query: (teacherName) => ({
        url: "/poll",
        method: "POST",
        body: { teacherName }
      })
    })
  })
})

export const { useCreatePollMutation } = pollApi
