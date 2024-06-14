import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";


export const Blogs = () => { 

    const {loading, blogs} = useBlogs();

    if(loading) { 
        return <div className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    }

    return ( 
    <div className="p-4 flex justify-center pb-4">
        <div >
          {blogs.map(blog =>   <BlogCard 
                id={blog.id}
                autherName={blog.auther.name || "Anonymos" }
                title={blog.title}
                content={blog.content}
                publishedDate={"2nd Feb 2024"} />)}
        </div>
        
    </div>
    )
}