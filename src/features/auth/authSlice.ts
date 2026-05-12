import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('qa_token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('qa_token', action.payload);
      } else {
        localStorage.removeItem('qa_token');
      }
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
