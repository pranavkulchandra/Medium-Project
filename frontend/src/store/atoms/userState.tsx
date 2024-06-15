import { atom } from "recoil";

export interface UserState { 
    email : string | null , 
    password: string | null, 
    name : string | null 
    isLoading : boolean
}

export const userState = atom<UserState>({ 
    key : "userState", 
    default : { 
        email : null, 
        password : null, 
        name : null,
        isLoading : false
    }
})