import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { IPlanet, TBeResponseWithData } from '../../types/global';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PUBLIC_URL,
});

export const baseQueryWrapper: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result: any = await baseQuery(args, api, extraOptions);
    return result;
};

export const planetsApi = createApi({
    reducerPath: 'planetsApi',
    baseQuery: baseQueryWrapper,
    endpoints: (builder) => ({
        getAllPlanets: builder.query<TBeResponseWithData<IPlanet>, { searchValue?: string; page?: number }>({
            query({ searchValue, page }) {
                let url = '';

                if (searchValue) {
                    url = `/planets?search=${searchValue}`
                } else if (page) {
                    url = `/planets/?page=${page}`
                } else {
                    url = '/planets'
                }
                return { url };
            },
        }),
    }),
});

export const { useGetAllPlanetsQuery } = planetsApi;
