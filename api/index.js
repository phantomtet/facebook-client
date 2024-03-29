import axios from "axios";

axios.interceptors.request.use((config) => {
  config.baseURL = process.env.NEXT_PUBLIC_API_URL;
  config.headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    ...config.headers,
  };
  return config;
});
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const message = err.response?.data?.name || err;
    throw { ...err, message };
  }
);
const api = axios;

api.LOGIN = (data) => axios.post("login", data);
api.GET_FEED = (params) => axios.get("feed", { params });
api.COMMENT = (data) => axios.post("comment", data);
api.GET_SELF_PROFILE = () => axios.get("@me");
api.CREATE_NEW_POST = (data) => axios.post("post", data);
api.SEARCH = (params) => axios.get("search", { params });
api.REACT_TO_POST = (id, data) => axios.post(`post/${id}/reaction`, data);
api.GET_CONTACT = (params) => axios.get("contact", { params });
api.GET_MESSAGE = (id, params) => axios.get(`message/${id}`, { params });
api.SEND_MESSAGE = (id, data) => axios.post(`message/${id}`, data);
api.GET_MESSAGE_CHANNEL = (params) => axios.get("msgchannel", { params });
api.GET_MORE_COMMENTS = (id, params) =>
  axios.get(`post/${id}/comments`, { params });
api.GET_POST_REACTION = (id, params) =>
  axios.get(`post/${id}/reaction`, { params });
api.UPLOAD = (data) => axios.post("upload", data);
api.GET_USER_PROFILE = (id) => axios.get(`profile/${id}`);
export default api;
