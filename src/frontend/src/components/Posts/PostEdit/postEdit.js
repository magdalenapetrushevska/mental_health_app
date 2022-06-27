import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostEdit = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        title: "",
        content: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const title = formData.title !== "" ? formData.title : props.post.title;
        const content = formData.content !== "" ? formData.content : props.post.content;
       
       

        props.onEditPost(props.post.id, title,content);
        navigate('/posts');
    }

    return(
        <>
        <div>
        </div>
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Title</label>
                        <input type="text"
                               className="form-control"
                               id="title"
                               name="title"
                               placeholder={props.post.title}
                               onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="name">Content</label>
                        <input type="text"
                               className="form-control"
                               id="content"
                               name="content"
                               placeholder={props.post.content}
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

export default PostEdit;