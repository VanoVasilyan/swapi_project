import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ICharacter, TBeResponseWithData } from '../../types/global';

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

export const charactersApi = createApi({
    reducerPath: 'charactersApi',
    baseQuery: baseQueryWrapper,
    endpoints: (builder) => ({
        getAllCharacters: builder.query({
            query: () => ({ url: '/people/' })
        }),
        charactersNextPage: builder.mutation({
            query: ({ url }) => ({ url })
        }),
        charactersPreviousPage: builder.mutation({
            query: ({ url }) => ({ url })
        }),
        searchCharacters: builder.mutation<
            TBeResponseWithData<ICharacter>,
            { name: string }
        >({
            query({ name }) {
                return {
                    url: `/people?search=${name}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useLazyGetAllCharactersQuery,
    useCharactersNextPageMutation,
    useCharactersPreviousPageMutation,
    useSearchCharactersMutation
} = charactersApi;
