import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import MapPageSlice from "./MapPageSlice";
import MyAccountSlice from "./MyAccount";
import PageSettingSlice from "./PageSettingSlice";
import ThemeSlice from "./ThemeSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};

export const store = configureStore({
    reducer: {
        theme: ThemeSlice.reducer,
        pageSetting: PageSettingSlice.reducer,
        myAccount:MyAccountSlice.reducer,
        mapPage:MapPageSlice.reducer
    },
    preloadedState: loadState(),
    devTools: true,
});
store.subscribe(() => {
    saveState(store.getState());
});

export const actions = {
    theme: ThemeSlice.actions,
    pageSetting: PageSettingSlice.actions,
    myAccount: MyAccountSlice.actions,
    mapPage:MapPageSlice.actions
}


export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

