import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { BackendUrl } from "../config"


interface BlogCardProps { 
    id : string,
    autherName : string, 
    title : string, 
    content : string, 
    publishedDate : string
}






export const BlogCard  = ( {
    id,
    autherName, 
    title, 
    content, 
    publishedDate
 } : BlogCardProps) => { 

    return <div className="pt-5 border-b border-slate-200 w-screen max-w-screen-lg">
            <div className="flex ">
                <div className="flex justify-center flex-col text-sm">
                    <Avatar name={autherName}/>
                </div>
                 <div className="flex justify-center flex-col pl-1 pr-1 text-sm font-normal "> 
                        {autherName}
                </div> 
                    <div className="flex justify-center flex-col">
                        <Dot />
                    </div>
                    <div className="flex justify-center flex-col pl-1 font-extralight text-sm text-slate-500">
                        {publishedDate}
                    </div>  
               </div>
               <Link to={`/blog/${id}`}>
                    <div className="text-xl font-bold font-serif pt-2 cursor-pointer">
                        {title}
                    </div>
                </Link>
                <div className="font-normal text-md text-slate-600">
                    {content.slice(0,100) + "...."}
                </div>
                <div className="text-slate-500 text-sm pt-4 pb-5">
                    {`${Math.floor(content.length / 238)} min read`}
                </div>
    </div>
}


export function Avatar({ name, size = "small" } : {name: string , size? : "big" | "small"}) {
    return <div className={`relative inline-flex items-center justify-center ${size === "big" ? "w-10 h-10" : "w-6 h-6" } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size === "big" ? "text-md" : "text-xs"} text-gray-600 dark:text-gray-300`}>{name.slice(0,2)}</span>
</div>

 }
 
 function Dot () { 
    return <div className="w-1 h-1 rounded-full bg-slate-400">

    </div>
 }