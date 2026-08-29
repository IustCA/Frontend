import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToast(state, action) {
      state.toast = action.payload;
    },
  },
});

export const { setToast } = appSlice.actions;

export function showToast(toastTimer, msg, type = "ok") {
  if (toastTimer.current) clearTimeout(toastTimer.current);

  return async function (dispatch) {
    dispatch(setToast({ msg, type }));
    toastTimer.current = setTimeout(() => dispatch(setToast(null)), 2600);
  };
}

export default appSlice.reducer;
