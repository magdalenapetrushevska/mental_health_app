
import axios from '../custom-axios/axios';



const MentalHealthService = {
   
    register: (username,password,phone_number) => {
        return axios.post("/register", {
            "username" : username,
            "password" : password,
            "phone_number": phone_number
        });
    },
    fetchPosts: () => {
        return axios.get("/posts");
    },
    getPost: (id) => {
        return axios.get(`/post/${id}`);
    },
    deletePost: (id) => {
        return axios.delete(`/post/${id}`);
    },
    addPost: (title,content) => {
        return axios.post("/posts", {
            "title" : title,
            "content" : content
        });
    },
    editPost: (id, title,content) => {
        return axios.put(`/post/${id}`, {
            "title" : title,
            "content" : content
        });
    },
  
    



}

export default MentalHealthService;