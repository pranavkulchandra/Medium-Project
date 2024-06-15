import { selector } from "recoil";
import { userState } from "../atoms/userState";


export const isUserEmail = selector<string | null >({ 
    key : "isUserEmail", 
    get : ({get}) => { 
        const state = get(userState)
        return state.email
    }
})