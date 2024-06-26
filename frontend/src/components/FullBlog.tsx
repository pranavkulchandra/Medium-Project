import { useNavigate } from "react-router-dom"
import { Blogs } from "../hooks"
import { Avatar } from "./BlogCard"
import axios from "axios"
import { BackendUrl } from "../config"

export const FullBlog = ({blog } : { blog : Blogs}) => { 

    

    const navigate = useNavigate()
    const deleteBlog = async () => { 
        try {
            await axios.delete(`${BackendUrl}/api/v1/blog/${blog.id}`, { 
                headers : { 
                    "Authorization" : localStorage.getItem("token")
                }
            })
            navigate("/blogs")
        } catch (error) {
            console.log(error)
        }
    }


    return <div className="flex justify-center">
     <div className="grid grid-cols-12 px-10 pt-10 w-full pt-200 max-w-screen-xl">
        <div className="col-span-8 ">
            <div className="text-5xl font-extrabold ">
                  {blog.title} 
            </div>
            <div className="text-slate-400 font-light text-xs pt-2">
                Posted on 2nd Dec 2023
            </div>
            <div className="pt-4">
                <div dangerouslySetInnerHTML={{ __html: blog.content}} />
            </div>
            <div>
                <button onClick={deleteBlog} type="button" className="text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete Blog</button>
            </div>
        </div>
        <div className="col-span-4">
           <div className="font-sans text-slate-500">
            Author
            </div>  
            <div className="flex jus">
                <div className="flex flex-col justify-center pr-3">
                    <Avatar name={blog.auther.name || "Anonymus"} size="big" />                  
                </div>
                <div>
                    <div className="text-xl font-bold">
                        {blog.auther.name || "Anonymons"}
                    </div>
                    <div className="pt-2 text-slate-500">
                        Random Catch Phrase by the author 
                    </div>
                </div>
            </div>
        </div>        
    </div>
    </div>
}