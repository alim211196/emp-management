import { configureStore } from "@reduxjs/toolkit";
import snackbarSlice from './reducer/Snackbar'
export const store = configureStore({
  reducer: {
    snackbar: snackbarSlice,
  },
});
