import React from 'react';
import {useNavigate} from "react-router-dom";
import Header from '../Header/header';

const AddReminder = (props) => {

    let navigate=useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        quantity: "",
        start_date: "",
        end_date: "",
        publish_time: "",
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const quantity = formData.quantity;
        const start_date = formData.start_date;
        const end_date = formData.end_date;
        const publish_time = formData.publish_time;

        props.onAddReminder(name,quantity,start_date,end_date,publish_time);
        navigate("/reminders");
    }

    return(
        <>
        <Header>
        </Header>
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                     <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter title"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number"
                               className="form-control"
                               id="quantity"
                               name="quantity"
                               required
                               onChange={handleChange}
                        />
                    </div> 
                
                    <div className="form-group">
                        <label htmlFor="start_date">Start date</label>
                        <input type="date"
                               className="form-control"
                               id="start_date"
                               name="start_date"
                               required
                               onChange={handleChange}
                        />
                    </div> 
                    <div className="form-group">
                        <label htmlFor="start_date">End date</label>
                        <input type="date"
                               className="form-control"
                               id="end_date"
                               name="end_date"
                               required
                               onChange={handleChange}
                        />
                    </div> 

                    <div>
                        <input type="time" id="publish_time" name="publish_time" required
                               onChange={handleChange}/>
                    </div>
                    
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default AddReminder;