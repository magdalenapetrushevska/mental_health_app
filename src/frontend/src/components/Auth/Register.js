import React from 'react';
import {useNavigate} from "react-router-dom";


const Register = (props) => {

    let navigate=useNavigate();
    const [formData, updateFormData] = React.useState({
        username: "",
        password: "",
        phone_number: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const username = formData.username;
        const password = formData.password;
        const phone_number = formData.phone_number;

        props.onRegister(username,password,phone_number);
        navigate("/");
    }



    return(
        <>
         <form onSubmit={onFormSubmit}>
                       <label style={{marginRight: 10 }}>Username: </label>
                       <input type='text' id="username"
                               name="username" onChange={handleChange} />

                       <label style={{marginRight: 10 }}>Password: </label>
                       <input type='text' id="password"
                               name="password" onChange={handleChange}/>

                        <label style={{marginRight: 10 }}>Phone number: </label>
                       <input type='text' id="phone_number"
                               name="phone_number" onChange={handleChange}/>

                       <button id="submit" type="submit" className="btn btn-primary">Submit</button> 
                   </form>

        </>
    )
}

export default Register;





