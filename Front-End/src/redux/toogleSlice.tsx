import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface ToggleState {
    menuOpen: boolean;
    openPage:{[key:string]:boolean};
    productAdddingState:number | null;
    productId:string;
}

const initialState: ToggleState = {
    menuOpen: false,
    openPage:{},
    productAdddingState: 1,
    productId:""
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
        },
        toggleProductAddingState:(state ,action:PayloadAction<number>) =>{
            state.productAdddingState = action.payload;
        },
        toggleProductId:(state,action:PayloadAction<string>)=>{
            state.productId = action.payload;
        }

    }
})

export const { toggleMenuOpen, toggleResetPage , togglePageControl , toggleProductAddingState,toggleProductId } = toggleSlice.actions;
export default toggleSlice.reducer;