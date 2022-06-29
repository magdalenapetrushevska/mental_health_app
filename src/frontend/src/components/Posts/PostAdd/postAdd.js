import React from 'react';
import {useNavigate} from "react-router-dom";
import Header from '../../Header/header';

const PostAdd = (props) => {

    let navigate=useNavigate();
    const [formData, updateFormData] = React.useState({
        title: "",
        content: "",
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const title = formData.title;
        const content = formData.content;

        props.onAddPost(title,content);
        navigate("/posts");
    }

    return(
      <>
      <Header></Header>
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input type="text"
                               className="form-control"
                               id="title"
                               name="title"
                               required
                               placeholder="Enter title"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Content</label>
                        <input type="text"
                               className="form-control"
                               id="content"
                               name="content"
                               placeholder="content ..."
                               required
                               onChange={handleChange}
                        />
                    </div>
                    
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default PostAdd;