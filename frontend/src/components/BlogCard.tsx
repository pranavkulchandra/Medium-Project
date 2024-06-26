
import { Link } from "react-router-dom"


interface BlogCardProps { 
    id : string,
    autherName : string, 
    title : string, 
    content : string, 
    publishedDate : string
}


const stripHtmlTags = (html : string) => { 
    const tempDiv = document.createElement("div"); 
    tempDiv.innerHTML = html; 
    return tempDiv.textContent || tempDiv.innerText || "" ;
}



export const BlogCard  = ( {
    id,
    autherName, 
    title, 
    content, 
    publishedDate
 } : BlogCardProps) => { 

    const plainTextContent = stripHtmlTags(content);
    const readingTime = Math.floor(plainTextContent.length / 238)

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
                   <div dangerouslySetInnerHTML={{ __html :  content.slice(0,100) + "...."}} />
                </div>
                <div className="text-slate-500 text-sm pt-4 pb-5">
                    {`${readingTime} min read`}
                </div>
    </div>
}


export function Avatar({ name, size = "small" } : {name: string , size? : "big" | "small"}) {
    return <div className={`relative inline-flex items-center justify-center ${size === "big" ? "w-10 h-10" : "w-6 h-6" } overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size === "big" ? "text-md" : "text-xs"} text-gray-600 dark:text-gray-300`}>{name.slice(0,2)}</span>
</div>

 }
 
export function Dot () { 
    return <div className="w-1 h-1 rounded-full bg-slate-400">

    </div>
 }


 export interface DropdownProps { 
    name : string | "",
    email : string | "", 
}

export const DropDownMenu = ({name, email } : DropdownProps) => { 

    return(

             <div>
                <Avatar name={name} size="small" />
                <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{name}</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{email}</span>
                </div>
            </div>
    )

    
}