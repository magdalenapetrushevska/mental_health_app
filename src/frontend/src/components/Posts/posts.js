import React from "react";
import { Link } from "react-router-dom";


const Posts = (props) => {

  
    return (
      <>
       <div>
       {props.posts.map((term) => {
                            return (
                                <div>
                                     <p>_______________________________________________</p>
                                   <b> <p>{term.title}</p> </b>
                                    <p>{term.content}</p>
                                    <p>{term.posted}</p>
                                    
                                    <br/>
                                    <Link title={"View"} 
                   onClick={() => props.onView(term.id)}
                    to={`/post/${term.id}`}
                   >
                    View post
                </Link> <br/> <br/>
                <button title={"Delete"} 
                   onClick={() => props.onDelete(term.id)}>
                    Delete
                </button>
                <br/> <br/>
                <Link className={"btn btn-info "}
                      onClick={() => props.onEdit(term.id)}
                      to={`/posts/edit/${term.id}`}>
                    Edit
                </Link>
               

                                </div>
                            );
                        })}

        </div>

<br/><br/>
        <div>
        <Link className={"btn btn-block btn-dark"} to={"/posts/add"}>Create new post</Link>
        </div>
        <br/><br/>
   
    

      </>
    );
  }


export default Posts;