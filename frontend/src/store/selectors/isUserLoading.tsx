import { selector } from "recoil";
import { userState } from "../atoms/userState";

export const isUserLoading = selector<boolean>({ 
    key : "isUserLoading", 
    get : ({get}) => { 
        const state = get(userState);
        return state.isLoading
    }
})