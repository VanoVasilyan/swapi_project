import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { planetsApi } from './services/planets';
import { charactersApi } from './services/characters';
import { filmsApi } from './services/films';
import planetsReducer from './slices/planets';
import charactersReducer from './slices/characters';
import filtersReducer from './slices/filters';
import filmsReducer from './slices/films';

const combined = combineReducers({
    [charactersApi.reducerPath]: charactersApi.reducer,
    [planetsApi.reducerPath]: planetsApi.reducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
    characters: charactersReducer,
    planets: planetsReducer,
    showFilters: filtersReducer,
    films: filmsReducer,
});

const masterReducer = (state: ReturnType<typeof combined> | undefined, action: Parameters<typeof combined>[1]): ReturnType<typeof combined> => {
    return combined(state, action);
};

export const store = configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(planetsApi.middleware)
            .concat(charactersApi.middleware)
            .concat(filmsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
