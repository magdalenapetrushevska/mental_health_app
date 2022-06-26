
import axios from '../custom-axios/axios';



const MentalHealthService = {
   
    register: (username,password,phone_number) => {
        return axios.post("/register", {
            "username" : username,
            "password" : password,
            "phone_number": phone_number
        });
    },
  
    



}

export default MentalHealthService;