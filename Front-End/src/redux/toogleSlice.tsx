import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface ToggleState {
    menuOpen: boolean;
    openPage:{[key:string]:boolean};
}

const initialState: ToggleState = {
    menuOpen: false,
    openPage:{}
}

const toggleSlice = createSlice({
    name: "toogle",
    initialState,
    reducers: {
        toggleMenuOpen: (state) => {
            state.menuOpen = !state.menuOpen
        },
       
        togglePageControl:(state,action:PayloadAction<string>) =>{
            const title = action.payload;
            state.openPage= {};
            state.openPage[title] = true   
        },
        toggleResetPage:(state) =>{
            state.openPage = {};
        }
    }
})

export const { toggleMenuOpen, toggleResetPage , togglePageControl } = toggleSlice.actions;
export default toggleSlice.reducer;