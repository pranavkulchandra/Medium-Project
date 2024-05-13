import { SignupInput } from "@pkulchandra/medium-common-package"
import { useState } from "react"
import { Link } from "react-router-dom"
import { LabelledInput } from "./LabelledInput"
import { EyeIcon, EyeSlash } from "./Icons"

export const Auth =({type}: {type: "singup" | "signin"}) => { 

    const [postInputs, setPostInputs ]  = useState<SignupInput>({
        email : "", 
        password : "", 
        name : ""
    })
    const [ showPassword, setShowPassword] = useState(false)

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold">
                    Create an Account
                </div>
                <div className="text-slate-700">
                    Already Have an Account? 
                    <Link to={"/signup"} className="pl-2 underline">Login</Link> 
                </div>
                    <LabelledInput type="text" label="Name" placeholder="John" onChange={(e) => { 
                        setPostInputs(c => ({
                            ...c, 
                            name : e.target.value
                        }))
                    }} />
                    <LabelledInput type="text" label="Email" placeholder="Johm@gmail.com" onChange={(e) => { 
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
                        className="absolute inset-y-0 right-0 pr-3 pb-5 flex items-center"
                    >
                     {showPassword ? <EyeIcon /> : <EyeSlash />}       
                    </button>
                    </div>
            </div>
        </div>
    </div>
}