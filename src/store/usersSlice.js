import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState:    {
    currentUser: null
  },
  reducers: {
     setUser: (users, action) => {
      // console.log("state of user:");
      // console.log('setUser',action.payload);
        users.currentUser = action.payload;
    }
  }
}) // this reducer will be used to SET the user

export const { setUser } = usersSlice.actions;

export const selectUsers = state => state.users;

export default usersSlice.reducer;