import { Link, useNavigate } from "react-router-dom"
import {  DropDownMenu } from "./BlogCard"
import { useRecoilState, useRecoilValue,  } from "recoil"
import { UserState, userState } from "../store/atoms/userState"
import { isUserEmail } from "../store/selectors/isUserEmail"


export const AppBar = () => {


    
    const userEmail = useRecoilValue<string | null >(isUserEmail)
    
     if ( userEmail) { 
        return <IfSignedIn />
    } else { 
        return <IfSignedOut />
    }

 }



 function IfSignedIn  () { 

    

    const navigate = useNavigate()

    const [ user, setUser] = useRecoilState<UserState>(userState || "")

    const handleSignout =() => { 
        localStorage.removeItem("token")
        setUser({ 
            email : null, 
            password : null, 
            name : null,
            isLoading : false
        })
        navigate("/")
    }

    const handleAddBlog = () => { 
        navigate("/publish");
    }

    

    return <div className="flex justify-between border-b px-10 py-4">
    <Link to={"/blogs"} >
        <div className="pt-2 flex justify-center flex-col cursor-pointer">
            Medum
        </div>
    </Link>
    <div className="flex">
        <div className="flex flex-col justify-center">
            <button onClick={handleAddBlog}  type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Add Blog</button>
        </div>  
        <div className="pl-1">
            <button onClick={handleSignout}  type="button" className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">SigOut</button>
        </div>
        <div>
            <DropDownMenu name={user.name || ""} email={user.email || ""}/>
        </div>
        
    </div>
</div>

 }


 function IfSignedOut () { 

    const navigate = useNavigate()


    const handleSignin = () => { 
        navigate("/Signin");
    }
    const handleSignup = () => { 
        navigate("/Signup");
    }

    return (
        <div className="flex justify-between border-b px-10 py-4">
        <Link to={"/blogs"} >
            <div className="pt-2 flex justify-center flex-col cursor-pointer">
                Medum
            </div>
        </Link>
        <div className="flex">
            <div className="flex flex-col justify-center pr-4">
                <button onClick={handleSignin}  type="button" className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Signin</button>
            </div>  
            <div>
            <button onClick={handleSignup}  type="button" className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">SignUp</button>
            </div>
        </div>
    </div>
    )

 }