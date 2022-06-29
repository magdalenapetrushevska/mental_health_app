import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";


const Post = (props) => {
  return (
    <>
    <Header></Header>
      <div>
      <Link class={"btn btn-block btn btn-outline-primary ml-5 pl-5 mb-5 mt-5"} to={"/comments/add"}>Add new comment</Link>
       {/* <p>{props.post.id}</p> */}
       {/*   <b>
          <p>{props.post.title}</p>
        </b>
        <p>{props.post.content}</p>
        <p>{props.post.posted}</p>
        {props.comments.map((term) => {
           return (
            <>
            <h6>Comments</h6>
            <div>
              <p>{term.content}</p>
              </div>
              </>
            );
                        })}
                         */}

<div class="card" style={{'width': '18rem'}}>
  <div class="card-body">
    <h5 class="card-title">{props.post.title}</h5>
    <p>Content:</p>
    <p class="card-text"><b>{props.post.content}</b></p>
    <p>Posted: </p>
    <p><b>{props.post.posted}</b></p>
    {/* <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a> */}
  </div>
</div>
      
      </div>
    </>
  );
};


export default Post;