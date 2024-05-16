import { SignupInput } from "@pkulchandra/medium-common-package"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LabelledInput } from "./LabelledInput"
import { EyeIcon, EyeSlash } from "./Icons"
import axios from "axios"
import { BackendUrl } from "../config"
import { split } from "postcss/lib/list"


export const Auth =({type}: {type: "signup" | "signin"}) => { 

    const navigate = useNavigate()
    const [postInputs, setPostInputs ]  = useState<SignupInput>({
        email : "", 
        password : "", 
        name : ""
    })

    async function sendRequest() {
        try {
           const response = await axios.post(`${BackendUrl}/api/v1/user/${type==="signup" ? "signup" : "signin"}`,postInputs )
           const token = response.data;
           console.log(token)
           if (token) { 
            localStorage.setItem("token", token);
            navigate("/blogs")
           } else {
            console.log("No JWT found")
           }
        } catch (error) {
            console.log(error)
        }
    }


    const [ showPassword, setShowPassword] = useState(false)

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div >
                <div className={type === "signup" ? "px-14" : "" } >
                    <div className="text-3xl font-extrabold">
                        {type === "signup" ? "Create an Account" : "Already Have an Account"}
                    </div>
                    <div className="text-slate-700 pb-4 text-center">
                        {type === "signup" ? "Already Have an Account?" : "Create an Account"}
                        <Link to={type === "signup" ? "/signin" : "/signup"} className="pl-2 underline">{type === "signup" ? "Singup" : "Login"}</Link> 
                    </div>
                    </div>
                    {type === "signup" ? 
                    <LabelledInput label="Name" placeholder="John" onChange={(e) => { 
                        setPostInputs(c => ({
                            ...c, 
                            name : e.target.value
                        }))
                    }} /> : null } 
                    <LabelledInput label="Email" placeholder="Johm@gmail.com" onChange={(e) => { 
                        setPostInputs(c => ({
                            ...c, 
                            email : e.target.value
                        }))
                    }}/>
                    <div className="relative">
                    <LabelledInput type={showPassword ? "text" : "password"} label="Password" placeholder="*****" onChange={(e) => { 
                        setPostInputs(c => ({ 
                            ...c, 
                            password : e.target.value
                        }))                    
                    }} />
                    <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center"
                    >
                     {showPassword ? <EyeIcon /> : <EyeSlash />}       
                    </button>
                    </div>
                    <div>
                        <button onClick={sendRequest} className="bg-slate-800 mt-3 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 w-full border-slate-700 hover:border-slate-500 rounded-lg">
                            {type === "signup" ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
            </div>
        </div>
    </div>
}