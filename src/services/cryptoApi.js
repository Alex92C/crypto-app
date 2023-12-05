import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "1caeed3632msha3bb3c15e8ce4a7p1d6952jsnd6ec249b6dba",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    // getExchanges: builder.query({
    //   query: () => createRequest(`/exchanges`),
    // }),
    getCryptoDetails: builder.query({
      query: (coinid) => createRequest(`/coin/${coinid}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinid, timeperiod }) =>
        createRequest(`/coin/${coinid}/history/${timeperiod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  // useGetExchangesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
// const options = {
//   method: "GET",
//   url: "https://coinranking1.p.rapidapi.com/coins",
//   params: {
//     referenceCurrencyUuid: "yhjMzLPhuIDl",
//     timePeriod: "24h",
//     "tiers[0]": "1",
//     orderBy: "marketCap",
//     orderDirection: "desc",
//     limit: "50",
//     offset: "0",
//   },
//   headers: {
//     "X-RapidAPI-Key": "1caeed3632msha3bb3c15e8ce4a7p1d6952jsnd6ec249b6dba",
//     "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//   },
// };
