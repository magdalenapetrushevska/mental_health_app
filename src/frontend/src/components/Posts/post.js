import React from "react";
import { Link } from "react-router-dom";


const Post = (props) => {
  return (
    <>
      <div>
      <p>{props.post.id}</p>
        <b>
          <p>{props.post.title}</p>
        </b>
        <p>{props.post.content}</p>
        <p>{props.post.posted}</p>

      </div>
    </>
  );
};


export default Post;