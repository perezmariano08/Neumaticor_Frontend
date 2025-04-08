import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toastQueue: [],  // Aquí almacenamos los toasts pendientes de mostrar
    },
    reducers: {
        addToast: (state, action) => {
            state.toastQueue.push(action.payload);  // Añadimos un nuevo toast a la cola
        },
        removeToast: (state) => {
            state.toastQueue.shift();  // Eliminamos el toast más antiguo (FIFO - First In First Out)
        }
    }
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
