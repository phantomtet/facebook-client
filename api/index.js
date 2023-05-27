import axios from "axios";

// const axios = axios.create()

axios.interceptors.request.use(config => {
    config.baseURL = process.env.NEXT_PUBLIC_API_URL
    config.headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return config
})
axios.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        throw ({ ...err, name: err.response.data.name })
    }
)
const api = {}

api.LOGIN = (data) => axios.post('login', data)

export default api