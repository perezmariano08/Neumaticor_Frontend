import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,  // Guardará los datos del usuario
    isAuthenticated: false,  // Para saber si el usuario está autenticado
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
