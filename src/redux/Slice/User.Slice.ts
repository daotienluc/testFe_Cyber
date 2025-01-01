import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  user: { [key: string]: any } | null;
}

const initialState: UserState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string).user
    : null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleUpdateUser: (
      state,
      action: PayloadAction<{ [key: string]: any } | null>
    ) => {
      state.user = action.payload;
    },
    handleDeleteUser: (state) => {
      state.user = null;
    },
  },
});
export const { handleUpdateUser, handleDeleteUser } = UserSlice.actions;
export default UserSlice.reducer;
