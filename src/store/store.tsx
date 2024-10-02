import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { planetsApi } from './services/planets';
import planetsReducer from './slices/planets';

const combined = combineReducers({
    [planetsApi.reducerPath]: planetsApi.reducer,
    planets: planetsReducer
});

const masterReducer = (state: any, action: any) => {
    return combined(state, action);
};

export const store = configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(planetsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
