import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    hidden: true,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState: INITIAL_STATE,
    reducers: {
        //Toggle de apertura/cierre del menu
        toggleHiddenMenu: (state) => {
            return {
                ...state,
                hidden: !state.hidden
            }
        }
    }
})

export const {
    toggleHiddenMenu,
} = menuSlice.actions;

export default menuSlice.reducer;