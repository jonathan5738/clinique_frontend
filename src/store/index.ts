import { configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { listenerMiddleware } from "../listeners/listenerMiddleware";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(apiSlice.middleware)
})

