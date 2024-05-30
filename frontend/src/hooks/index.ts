import axios from "axios"
import { useEffect, useState } from "react"
import { BackendUrl } from "../config"

interface Blogs { 
    "content" : string, 
    "title" : string, 
    "id" : string, 
    auther : { 
        "name" : string
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
                console.log(resp.data)
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