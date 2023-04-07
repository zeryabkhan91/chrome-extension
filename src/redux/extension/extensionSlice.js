import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  secreteKey: "",
  password: "",
  isInitialized: false,
};

export const extensionSlice = createSlice({
  name: "extension",
  initialState,
  reducers: {
    resetExtension: (state, action) => {
      state.secreteKey = "";
      state.password = "";
      state.isInitialized = false;
    },
    setSecreteKey: (state, action) => {
      state.secreteKey = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { resetExtension, setSecreteKey, setPassword, setIsInitialized } =
  extensionSlice.actions;

export const selectExtension = (state) => state;
export default extensionSlice.reducer;
