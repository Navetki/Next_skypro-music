import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  username: string;
  access: string;
  refresh: string;
};

const initialState: initialStateType = {
  username: '',
  access: '',
  refresh: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string | null>) => {
      const value = action.payload || '';
      state.username = value;
      if (value) {
        localStorage.setItem('username', value);
      }
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      const value = action.payload || '';
      state.access = value;
      if (value) {
        localStorage.setItem('access', value);
      }
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      const value = action.payload || '';
      state.refresh = value;
      if (value) {
        localStorage.setItem('refresh', value);
      }
    },
    clearUser: (state) => {
      state.access = '';
      state.refresh = '';
      state.username = '';
      localStorage.removeItem('username');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
});

export const { setUsername, setAccessToken, setRefreshToken, clearUser } =
  authSlice.actions;
export const authSliceReducer = authSlice.reducer;
export default authSlice.reducer;
