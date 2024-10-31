import { TPlanetsData } from './../../types/planets';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { planetsApi } from '../services/planets';
import { TStore } from '../../types/store.main';

const initialState: TPlanetsData = {
    count: null,
    next: null,
    previous: null,
    results: null
};

export const planetsSlice = createSlice({
    name: 'planetsSlice',
    initialState,
    reducers: {
        setPlanets: (state, action) => {
            return {
                ...state,
                results: action.payload,
            };
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            planetsApi.endpoints.getAllPlanets.matchFulfilled,
            (state, { payload }) => {
                state.count = payload.count
                state.next = payload.next
                state.previous = payload.previous
                state.results = payload.results
            }
        )
    }
});

export default planetsSlice.reducer;
export const usePlanetsAction = () => {
    const dispatch = useDispatch();

    return bindActionCreators({ ...planetsSlice.actions }, dispatch);
};

export const usePlanetsSelector = () => {
    return useSelector((state: TStore) => state.planets);
};
