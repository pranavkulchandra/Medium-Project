import { Blogs } from "../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog } : { blog : Blogs}) => { 
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
                {blog.content}
            </div>
        </div>
        <div className="col-span-4 ">
           <div className="font-sans text-slate-500">
            Author
            </div>  
            <div className="flex">
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