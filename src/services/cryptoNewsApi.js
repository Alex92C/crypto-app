import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cryptocurrency-news2.p.rapidapi.com",
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => ({
        url: "/v1/coindesk",
        headers: {
          "X-RapidAPI-Key":
            "1caeed3632msha3bb3c15e8ce4a7p1d6952jsnd6ec249b6dba",
          "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
        },
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
