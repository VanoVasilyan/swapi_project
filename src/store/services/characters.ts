import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ICharacter, ISpecies, IVehicle, TBeResponseWithData } from '../../types/global';

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

export const charactersApi = createApi({
    reducerPath: 'charactersApi',
    baseQuery: baseQueryWrapper,
    endpoints: (builder) => ({
        getAllCharacters: builder.query<TBeResponseWithData<ICharacter>, { searchValue?: string; page?: number }>({
            query({ searchValue, page }) {
                let url = '';

                if (searchValue) {
                    url = `/people/?search=${searchValue}`
                } else if (page) {
                    url = `/people/?page=${page}`
                } else {
                    url = '/people'
                }
                return { url };
            },
        }),
        getSingleCharacter: builder.query<TBeResponseWithData<ICharacter>, { id: string }>({
            query({ id }) {
                return `/people/${id}`
            }
        }),
        getSingleSpecies: builder.query<TBeResponseWithData<ISpecies>, { id: string }>({
            query({ id }) {
                return `/species/${id}`
            }
        }),
        getSingleVehicle: builder.query<TBeResponseWithData<IVehicle>, { id: string }>({
            query({ id }) {
                return `/vehicles/${id}`
            }
        }),
        getSingleStarship: builder.query<TBeResponseWithData<IVehicle>, { id: string }>({
            query({ id }) {
                return `/starships/${id}`
            }
        }),
    }),
});

export const {
    useGetAllCharactersQuery,
    useLazyGetSingleCharacterQuery,
    useLazyGetSingleSpeciesQuery,
    useLazyGetSingleVehicleQuery,
    useLazyGetSingleStarshipQuery
} = charactersApi;
