import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MapPage{
    restaurants:Restaurant[];
    selected:Restaurant | null;
}

const initialState:MapPage = {
    restaurants:[],
    selected:null,
}

const MapPageSlice = createSlice({
    name:"mapPageSlice",
    initialState,
    reducers:{
        setRestaurants:(state,action: PayloadAction<Restaurant[]>)=>{
            return {...state,restaurants:action.payload}
        },
        setSelected:(state,action: PayloadAction<Restaurant | null>)=>{
            return {...state,selected:action.payload}
        }
    }
})

export default MapPageSlice;