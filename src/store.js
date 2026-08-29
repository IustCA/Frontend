import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/shared/AppSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
