import { useSetRecoilState } from "recoil"
import { UserState, userState } from "../store/atoms/userState"
import { useEffect } from "react"
import axios from "axios"
import { BackendUrl } from "../config"

function Init() { 


    const setUser = useSetRecoilState<UserState>(userState)

    const fetchUser = async () => { 

        try {
            const resp = await axios.get(`${BackendUrl}/api/v1/blog/me`, { 
                headers : { 
                    "Authorization" : localStorage.getItem("token")
                }
            })
            const userData = resp.data
            setUser({ 
                email : userData.email, 
                password: userData.password, 
                name : userData.name, 
                isLoading : false,

            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
    fetchUser()
    }, [])


    return <></>    
}

export default Init;