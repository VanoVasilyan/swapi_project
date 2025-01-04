import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { IFilm, TBeResponseWithData } from '../../types/global';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_PUBLIC_URL,
});

export const baseQueryWrapper: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    return result;
};

export const filmsApi = createApi({
    reducerPath: 'filmsApi',
    baseQuery: baseQueryWrapper,
    endpoints: (builder) => ({
        getAllFilms: builder.query<TBeResponseWithData<IFilm>, { searchValue?: string; page?: number }>({
            query({ searchValue, page }) {
                let url = '';

                if (searchValue) {
                    url = `/films/?search=${searchValue}`
                } else if (page) {
                    url = `/films/?page=${page}`
                } else {
                    url = '/films'
                }
                return { url };
            },
        }),
        getSingleFilm: builder.query<TBeResponseWithData<IFilm>, { id: string }>({
            query({ id }) {
                return `/films/${id}`
            }
        })
    }),
});

export const { useGetAllFilmsQuery, useLazyGetSingleFilmQuery } = filmsApi;
