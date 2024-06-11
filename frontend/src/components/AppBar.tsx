import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {

    const navigate = useNavigate()

    const handleAddBlog = () => { 
        navigate("/publish");
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
                    <button onClick={handleAddBlog}  type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Add Blog</button>
                </div>
                <div>
                    <Avatar size="big" name="Pranav"/>
                </div>
            </div>
        </div>
    )
 }