import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../store/usersSlice.js';

export default configureStore({
  reducer: {
   
    users: usersReducer
  }
})