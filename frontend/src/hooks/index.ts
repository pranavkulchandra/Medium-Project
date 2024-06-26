import axios from "axios"
import { useEffect, useState } from "react"
import { BackendUrl } from "../config"

export interface Blogs { 
    "content" : string, 
    "title" : string, 
    "id" : string, 
    auther : { 
        "name" : string
    }
}

export const useBlog = ({ id } : {id : string}) => { 
    const [ blog , setBlog ] = useState<Blogs>()
    const [ loading, setLoading]  = useState(true)
    
    useEffect(() => {

        axios.get(`${BackendUrl}/api/v1/blog/${id}`, {
            headers : { 
                Authorization : localStorage.getItem("token")
            }
        })
        .then(resp => { 
            setBlog(resp.data.blog)
            setLoading(false)
        })
        .catch(err => { 
            console.error(`Error`, err)
            setLoading(false)
        })

    }, [id])

    return { 
        blog, 
        loading
    }

}


export const useBlogs = () =>{ 
    const [ loading, setLoading ] = useState(true)
    const [ blogs , setBlogs ] = useState<Blogs[]>([])

    useEffect(() => { 
        axios.get(`${BackendUrl}/api/v1/blog/bulk`, { 
            headers : { 
                Authorization : localStorage.getItem("token")
            }
        })
            .then(resp => { 
                
                setBlogs(resp.data || [])
                setLoading(false)
            })
            .catch(error => { 
                console.error("Error ", error);
                setLoading(false)
            })
    }, [])

    return { 
        loading, 
        blogs 
    }
}