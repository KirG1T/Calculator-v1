import { configureStore } from '@reduxjs/toolkit';
import calcSlice from './calcSlice';

export const store = configureStore({
    reducer: {
        calc: calcSlice,
    },
});
