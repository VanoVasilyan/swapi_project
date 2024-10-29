import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { planetsApi } from './services/planets';
import { charactersApi } from './services/characters';
import planetsReducer from './slices/planets';
import charactersReducer from './slices/characters';
import filtersReducer from './slices/filters';

const combined = combineReducers({
    [charactersApi.reducerPath]: charactersApi.reducer,
    [planetsApi.reducerPath]: planetsApi.reducer,
    characters: charactersReducer,
    planets: planetsReducer,
    showFilters: filtersReducer,
});

const masterReducer = (state: any, action: any) => {
    return combined(state, action);
};

export const store = configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(planetsApi.middleware)
            .concat(charactersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
