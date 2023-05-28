import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import api from "../../api"
import { ReduxUserActions } from "@/redux/userSlice"

const useAuthenticate = () => {
    const user = useSelector(state => state.user.value)
    const [isLoading, setLoading] = useState(!user)
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user))
    const dispatch = useDispatch()
    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                setIsAuthenticated(false)
            }
            else {
                api.GET_SELF_PROFILE().then(res => {
                    dispatch(ReduxUserActions.storeUser(res.data))
                    setIsAuthenticated(true)
                    setLoading(false)
                })
            }
        }
    }, [])
    return { isAuthenticated, isLoading }
}

export default useAuthenticate