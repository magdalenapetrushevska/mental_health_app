import React from 'react';
import {useNavigate} from "react-router-dom";


const Register = (props) => {

    let navigate=useNavigate();
    const [formData, updateFormData] = React.useState({
        username: "",
        password: "",
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

        props.onRegister(username,password);
        navigate("/");
    }



    return(
        <>
       

<div className="row mt-5">
    <div>
        <h2 class="ml-5">Register</h2><br/><br/>
    </div>
            <div className="col-md-5 ml-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               name="username"
                               required
                               placeholder="Enter username"
                               onChange={handleChange}
                        />
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               name="password"
                               placeholder="Enter passowrd"
                               required
                               onChange={handleChange}
                        />
                    </div><br/>
                    <div className="form-group">
                        <label htmlFor="phone_number">Username</label>
                        <input type="text"
                               className="form-control"
                               id="phone_number"
                               name="phone_number"
                               required
                               placeholder="Enter phone number"
                               onChange={handleChange}
                        />
                    </div>
                    <br/><br/>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

        </>
    )
}

export default Register;