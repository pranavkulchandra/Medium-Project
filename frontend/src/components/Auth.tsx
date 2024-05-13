import { Link } from "react-router-dom"

export const Auth =({type}: {type: "singup" | "signin"}) => { 
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
            
            </div>
        </div>
    </div>
}