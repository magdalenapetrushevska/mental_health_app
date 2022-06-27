import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import MentalHealthService from "../../repository/mentalHealthRepository";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import {RequireToken} from '../Auth/Auth'
import Posts from "../Posts/posts";
import Post from "../Posts/post";
import PostAdd from "../Posts/PostAdd/postAdd";
import PostEdit from "../Posts/PostEdit/postEdit";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post: {},

    };
  }
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route
              path={"register"}
              exact
              element={<Register onRegister={this.register} />}
            />

            {/* <Route
              path="/profile"
              exact element={
                <RequireToken>
                  <Profile />
                </RequireToken>
              }
            /> */}

            <Route
              path={"/posts/edit/:id"}
              element={
                <RequireToken>
                  <PostEdit onEditPost={this.editPost} post={this.state.post} />
                </RequireToken>
              }
            />

            <Route
              path={"/posts/add"}
              exact
              element={
                <RequireToken>
                  <PostAdd onAddPost={this.addPost} />
                </RequireToken>
              }
            />

            <Route
              path={"/posts"}
              exact
              element={
                <Posts
                  posts={this.state.posts}
                  onView={this.viewPost}
                  onDelete={this.deletePost}
                  onEdit={this.viewPost}
                />
              }
            />
            <Route
              path={"/post/:id"}
              exact
              element={<Post post={this.state.post} />}
            />

            <Route path="/" exact element={<Login />} />
          </Routes>
        </Router>
      </>
    );
  }

  componentDidMount() { 
   this.loadPosts();
  };
  

register = (username,password,phone_number) => {
  MentalHealthService.register(username,password,phone_number)
      
};

loadPosts = () => {
  MentalHealthService.fetchPosts().then((data) => {
    this.setState({
      posts: data.data,
    });
  });
};


viewPost = (id) => {
  MentalHealthService.getPost(id)
      .then((data) => {
          this.setState({
              post: data.data
          })
      })
};

deletePost = (id) => {
MentalHealthService.deletePost(id)
    .then(() => {
        this.loadPosts();
    });
};

addPost = (title,content) => {
MentalHealthService.addPost(title,content)
    .then(() => {
      this.loadPosts();
    });
};

editPost = (id,title,content) => {
MentalHealthService.editPost(id, title,content)
    .then(() => {
      this.loadPosts();
    });
};




}

export default App;