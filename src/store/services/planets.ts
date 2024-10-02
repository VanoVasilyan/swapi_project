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
        getAllPlanets: builder.query({
            query: () => ({ url: '/planets/' })
        }),
        planetsNextPage: builder.mutation({
            query: ({ url }) => ({ url })
        }),
        planetsPreviousPage: builder.mutation({
            query: ({ url }) => ({ url })
        }),
        searchPlanets: builder.mutation<
            TBeResponseWithData<IPlanet>,
            { name: string }
        >({
            query({ name }) {
                return {
                    url: `/planets?search=${name}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useLazyGetAllPlanetsQuery,
    usePlanetsNextPageMutation,
    usePlanetsPreviousPageMutation,
    useSearchPlanetsMutation
} = planetsApi;
