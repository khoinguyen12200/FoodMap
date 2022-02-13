import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageSetting{
    isEmpty: boolean;
}

const initialState:PageSetting = {
    isEmpty:false
}

const PageSettingSlice = createSlice({
    name:"pageSetting",
    initialState,
    reducers:{
        setEmpty:(state,action: PayloadAction<boolean>)=>{
            return {...state,isEmpty:action.payload}
        }
    }
})

export default PageSettingSlice;