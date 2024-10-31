import { TFilmsData } from '../../types/films';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { TStore } from '../../types/store.main';
import { filmsApi } from '../services/films';

const initialState: TFilmsData = {
    count: null,
    next: null,
    previous: null,
    results: null
};

export const filmsSlice = createSlice({
    name: 'filmsSlice',
    initialState,
    reducers: {
        setFilms: (state, action) => {
            return {
                ...state,
                results: action.payload,
            };
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            filmsApi.endpoints.getAllFilms.matchFulfilled,
            (state, { payload }) => {
                state.count = payload.count
                state.next = payload.next
                state.previous = payload.previous
                state.results = payload.results
            }
        )
    }
});

export default filmsSlice.reducer;
export const useFilmsAction = () => {
    const dispatch = useDispatch();

    return bindActionCreators({ ...filmsSlice.actions }, dispatch);
};

export const useFilmsSelector = () => {
    return useSelector((state: TStore) => state.films);
};
