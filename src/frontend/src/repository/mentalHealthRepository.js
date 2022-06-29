
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
    fetchReminders: () => {
        return axios.get("/reminders");
    },
    getReminder: (id) => {
        return axios.get(`/reminder/${id}`);
    },
    deleteReminder: (id) => {
        return axios.delete(`/reminder/${id}`);
    },
    addReminder: (name,quantity,start_date,end_date,publish_time) => {
        return axios.post("/reminders", {
            "name" : name,
            "quantity" : quantity,
            "start_date" : start_date,
            "end_date" : end_date,
            "publish_time" : publish_time,
        });
    },
    editReminder: (id, name,quantity,start_date,end_date,publish_time) => {
        return axios.put(`/reminder/${id}`, {
            "name" : name,
            "quantity" : quantity,
            "start_date" : start_date,
            "end_date" : end_date,
            "publish_time" : publish_time,
        });
    },
  
    fetchMoods: () => {
        return axios.get("/moods");
    },
    addHistoryMood: (category,description) => {
        return axios.post(`/new-mood`, {
            "category" : category,
            "description" : description
        });
    },
    fetchHistoryMood: () => {
        return axios.get("/mood-history");
    },
    fetchMyPosts: () => {
        return axios.get("/owner-posts");
    },

    exportHistoryMood:()=>{
        return axios.get("/export-pdf")
    },
    fetchComments: (id) => {
        return axios.get(`/comments/${id}`);
    },
    addComment: (id,content) => {
        return axios.post(`add-comment/${id}`, {
            "content" : content
        });
    },

}

export default MentalHealthService;