import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/header';

const RateMood = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        category: "",
        description:"",
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const category = formData.category;
        const description = formData.description;


        props.onRateMood(category,description);
        navigate('/mood-history');
    }

    return(
        <>
        <Header></Header>
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    
                    
                    <div className="form-group">
                        <label>How do you feel today?</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.moods.map((term) =>
                                <option value={term}>{term}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label>What are the reasons for your current mood?</label>
                        <input type="text" id="description" name="description" onChange={handleChange}/> 
                    </div>
                   
                  

                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default RateMood;