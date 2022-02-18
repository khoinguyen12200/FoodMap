import { createSlice, PayloadAction } from "@reduxjs/toolkit";


declare global {
    interface MyAccount {
        token?: string;
        user?:User;
    }
    interface User {
        id: number;
        account: string;
        password: string;
        name: string;
        avatar: string;
        email?:string;
        address?:string;
        phone?:string;
    }

}


const initialState: MyAccount = {
    token:undefined,
    user:undefined,
};

const MyAccountSlice = createSlice({
    name: "MyAccountSlice",
    initialState,
    reducers: {
        setMyAccount: (state, action: PayloadAction<MyAccount>) => {
            return { ...state, ...action.payload};
        },
        logout:()=>{
            return {...initialState};
        }
    },
});

export default MyAccountSlice;
