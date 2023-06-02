import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../../api"
import { ReduxUserActions } from "@/redux/userSlice"
import { useRouter } from "next/navigation"

const useAuthenticate = () => {
    const user = useSelector(state => state.user.value)
    const router = useRouter()
    const [isLoading, setLoading] = useState(!user)
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user))
    const dispatch = useDispatch()
    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                setIsAuthenticated(false)
                router.push('/login')
            }
            else {
                api.GET_SELF_PROFILE().then(res => {
                    dispatch(ReduxUserActions.storeUser(res.data))
                    setIsAuthenticated(true)
                    setLoading(false)
                })
                    .catch(err => {
                        localStorage.removeItem('token')
                        router.push('/login')
                    })
            }
        }
    }, [])
    return { isAuthenticated, isLoading }
}

export default useAuthenticate