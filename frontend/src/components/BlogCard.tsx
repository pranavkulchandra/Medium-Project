

interface BlogCardProps { 
    authorName : string, 
    title : string, 
    content : string, 
    publishedDate : string
}


export const BlogCard  = ( {
    authorName, 
    title, 
    content, 
    publishedDate
 } : BlogCardProps) => { 

    return <div className="pt-5 border-b border-slate-200">
            <div className="flex ">
                <div className="flex justify-center flex-col text-sm">
                    <Avatar name={authorName}/>
                </div>
                 <div className="flex justify-center flex-col pl-1 pr-1 text-sm font-normal"> 
                        {authorName }
                </div>
                    <div className="flex justify-center flex-col">
                        <Dot />
                    </div>
                    <div className="flex justify-center flex-col pl-1 font-extralight text-sm text-slate-500">
                        {publishedDate}
                    </div>  
               </div>
                <div className="text-xl font-bold font-serif pt-2">
                    {title}
                </div>
                <div className="font-normal text-md text-slate-600">
                    {content.slice(0,100) + "...."}
                </div>
                <div className="text-slate-500 text-sm pt-4 pb-5">
                    {`${Math.floor(content.length / 238)} min read`}
                </div>
    </div>
}


function Avatar({ name } : {name: string}) {
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="text-xs text-gray-600 dark:text-gray-300">{name.slice(0,2)}</span>
</div>

 }

 function Dot () { 
    return <div className="w-1 h-1 rounded-full bg-slate-400">

    </div>
 }