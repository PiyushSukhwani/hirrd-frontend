import { createSlice } from "@reduxjs/toolkit";

const jwtSlice = createSlice({
  name: "jwt",
  initialState: localStorage.getItem("token") || "",
  reducers: {
    setJwt: (state, action) => {
      localStorage.setItem("token", action.payload);
      return (state = action.payload);
    },
    removeJwt: (state) => {
      localStorage.removeItem("token");
      return (state = "");
    },
  },
});

export default jwtSlice.reducer;
export const {setJwt, removeJwt} = jwtSlice.actions
