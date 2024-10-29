import { TCharactersData } from '../../types/characters';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { TStore } from '../../types/store.main';
import { charactersApi } from '../services/characters';

const initialState: TCharactersData = {
    count: null,
    next: null,
    previous: null,
    results: null
};

export const charactersSlice = createSlice({
    name: 'charactersSlice',
    initialState,
    reducers: {
        setCharacters: (state, action) => {
            return {
                ...state,
                results: action.payload,
            };
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            charactersApi.endpoints.getAllCharacters.matchFulfilled,
            (state, { payload }) => {
                state.count = payload.count
                state.next = payload.next
                state.previous = payload.previous
                state.results = payload.results
            }
        )
        builder.addMatcher(
            charactersApi.endpoints.charactersNextPage.matchFulfilled,
            (state, { payload }) => {
                state.count = payload.count
                state.next = payload.next
                state.previous = payload.previous
                state.results = payload.results
            }
        )
        builder.addMatcher(
            charactersApi.endpoints.charactersPreviousPage.matchFulfilled,
            (state, { payload }) => {
                state.count = payload.count
                state.next = payload.next
                state.previous = payload.previous
                state.results = payload.results
            }
        )
        builder.addMatcher(
            charactersApi.endpoints.searchCharacters.matchFulfilled,
            (state, { payload }) => {
                state.count = payload.count
                state.next = payload.next
                state.previous = payload.previous
                state.results = payload.results
            }
        )
    }
});

export default charactersSlice.reducer;
export const useCharactersAction = () => {
    const dispatch = useDispatch();

    return bindActionCreators({ ...charactersSlice.actions }, dispatch);
};

export const useCharactersSelector = () => {
    return useSelector((state: TStore) => state.characters);
};
