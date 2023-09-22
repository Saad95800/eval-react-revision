import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movie/MovieSlice'

export const store = configureStore({
    reducer: {
        movie: movieReducer
    }
})