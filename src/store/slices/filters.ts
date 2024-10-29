import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { TStore } from '../../types/store.main';
import { TShowFiltersAfterSearch } from '../../types/global';

const initialState: TShowFiltersAfterSearch = {
    showFilters: true
};

export const showFiltersSlice = createSlice({
    name: 'showFiltersSlice',
    initialState,
    reducers: {
        setShowFilters: (state, action) => {
            return {
                ...state,
                showFilters: action.payload,
            };
        }
    },
});

export default showFiltersSlice.reducer;
export const useShowFiltersAction = () => {
    const dispatch = useDispatch();

    return bindActionCreators({ ...showFiltersSlice.actions }, dispatch);
};

export const useShowFiltersSelector = () => {
    return useSelector((state: TStore) => state.showFilters);
};
