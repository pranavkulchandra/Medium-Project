import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";


export const Blog = () => { 

    const {id} = useParams()
    const { loading, blog} = useBlog({ 
        id : id || ""
    }) 

    if ( loading) { 
        return <div className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
            </div>
    }

    return <div>
        <FullBlog blog={blog}/>
    </div>
}