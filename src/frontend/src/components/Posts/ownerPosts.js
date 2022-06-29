import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";


const OwnerPosts = (props) => {

  
    return (
      <>
      <Header></Header>
      <br/><br/>
      <div>
        <Link class={"btn btn-block btn btn-outline-primary ml-5 pl-5"} to={"/posts/add"}>Create new post</Link>
        </div>
       

       <div>
       {props.posts.map((term) => {
                            return (
                //                 <div>
                //                      <p>_______________________________________________</p>
                //                    <b> <p>{term.title}</p> </b>
                //                     <p>{term.content}</p>
                //                     <p>{term.posted}</p>
                                    
                //                     <br/>
                //                     <Link title={"View"} 
                //    onClick={() => props.onView(term.id)}
                //     to={`/post/${term.id}`}
                //    >
                //     View post
                // </Link> <br/> <br/>
                // <Link title={"View"} 
                //    onClick={() => props.onViewMyPosts()}
                //     to={`/owner-posts`}
                //    >
                //     View my posts
                // </Link> <br/> <br/>
                // <button title={"Delete"} 
                //    onClick={() => props.onDelete(term.id)}>
                //     Delete
                // </button>
                // <br/> <br/>
                // <Link className={"btn btn-info "}
                //       onClick={() => props.onEdit(term.id)}
                //       to={`/posts/edit/${term.id}`}>
                //     Edit
                // </Link>
               

                //                 </div>
                
<div class="jumbotron ml-5 mr-5">
  <h1 class="display-6 mb-5 mt-5 ml-5">{term.title}</h1>
  <p class="lead">{term.posted}</p>
 
  <p>{term.content}</p>
  <p class="lead">
    
    <Link title={"View"} 
                   onClick={() => props.onView(term.id)}
                    to={`/post/${term.id}`}
                    class="btn btn-success btn-md ml-5">
                    View post
                </Link>

                <button title={"Delete"} class="btn btn-danger ml-5"
                   onClick={() => props.onDelete(term.id)}>
                    Delete
                </button>
                
                <Link className={"btn btn-info ml-5 "}
                      onClick={() => props.onEdit(term.id)}
                      to={`/posts/edit/${term.id}`}>
                    Edit
                </Link>
                 
  </p>
  <hr class="my-4"/>
</div>
                            );
                        })}

        </div>

<br/><br/>
        
   
    

      </>
    );
  }


export default OwnerPosts;