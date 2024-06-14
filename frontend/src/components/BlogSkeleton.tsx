import { Dot } from "./BlogCard"

export const BlogSkeleton = () => { 

return <div role="status" className="animate-pulse">
<div className="pt-5 border-b border-slate-200 w-screen max-w-screen-lg">
            <div className="flex ">
                <div className="flex justify-center flex-col text-sm">
                <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                </div>
                 <div className="flex justify-center flex-col pl-1 pr-1 text-sm font-normal "> 
                     <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div> 
                    <div className="flex justify-center flex-col">
                        <Dot />
                    </div>
                    <div className="flex justify-center flex-col pl-1 font-extralight text-sm text-slate-500">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>  
               </div>
               
                    <div className="text-xl font-bold font-serif pt-2 cursor-pointer">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                
                <div className="font-normal text-md text-slate-600">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-slate-500 text-sm pt-4 pb-5">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
    </div>
</div>



}