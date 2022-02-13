import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState{
    color:"light"|"dark"
}

const initialState:ThemeState = {
    color:"light"
}

const ThemeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggleTheme:(state)=>{
            return {...state,color:state.color==="light"?"dark":"light"}
        }
    }
})

export default ThemeSlice;