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
import {RequireToken} from '../Auth/Auth';
import Posts from "../Posts/posts";
import Post from "../Posts/post";
import PostAdd from "../Posts/PostAdd/postAdd";
import PostEdit from "../Posts/PostEdit/postEdit";
import Home from "../Home/home";
import Reminders from "../Reminders/reminders";
import AddReminder from "../Reminders/AddReminder";
import Reminder from "../Reminders/reminder";
import RateMood from "../Moods/rateMood";
import HistoryMood from "../Moods/historyMood";
import OwnerPosts from "../Posts/ownerPosts";
import Header from "../Header/header";
import ReminderEdit from "../Reminders/ReminderEdit";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post: {},
      reminders:[],
      reminder:{},
      historyMoods:[],
      moods:[],
      myPosts:[],

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

            

            <Route
              path={"/moods"}
              exact
              element={
                <RequireToken>
                  <RateMood
                    moods={this.state.moods}
                    onRateMood={this.addHistoryMood}
                  />
                </RequireToken>
              }
            />

            <Route
              path={"/mood-history"}
              exact
              element={
                <RequireToken>
                  <HistoryMood
                    historyMoods={this.state.historyMoods}
                    onExportHistoryMood={this.exportHistoryMood}
                  />
                </RequireToken>
              }
            />

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
                  onViewMyPosts={this.viewMyPosts}
                  onDelete={this.deletePost}
                  onEdit={this.viewPost}
                />
              }
            />
            <Route
              path={"/post/:id"}
              exact
              element={
                <RequireToken>
                  <Post post={this.state.post} comments={this.state.comments} />
                </RequireToken>
              }
            />

            <Route
              path={"/reminders"}
              exact
              element={
                <RequireToken>
                  <Reminders
                    reminders={this.state.reminders}
                    onView={this.viewReminder}
                    onDelete={this.deleteReminder}
                    onEdit={this.viewReminder}
                  />
                </RequireToken>
              }
            />

            <Route
              path={"/reminder/edit/:id"}
              element={
                <RequireToken>
                  <ReminderEdit
                    onEditReminder={this.editReminder}
                    reminder={this.state.reminder}
                  />
                </RequireToken>
              }
            />

            <Route
              path={"/owner-posts"}
              exact
              element={
                <RequireToken>
                  <OwnerPosts
                    posts={this.state.myPosts}
                    onView={this.viewPost}
                    onDelete={this.deletePost}
                    onEdit={this.viewPost}
                  />
                </RequireToken>
              }
            />

            <Route
              path={"/reminders/add"}
              exact
              element={
                <RequireToken>
                  <AddReminder onAddReminder={this.addReminder} />
                </RequireToken>
              }
            />

            <Route
              path={"/reminder/:id"}
              exact
              element={
                <RequireToken>
                  <Reminder reminder={this.state.reminder} />
                </RequireToken>
              }
            />

            <Route
              path="/login"
              exact
              element={<Login afterLogin={this.afterLogin} />}
            />

            <Route path="/header" exact element={<Header />} />

            <Route path="/" exact element={<Home />} />
          </Routes>
        </Router>
      </>
    );
  }

  componentDidMount() { 
   this.loadPosts();
   this.viewMyPosts();
   this.loadMoods();
   this.loadReminders();
   this.loadHistoryMood();
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

loadReminders = () => {
  MentalHealthService.fetchReminders().then((data) => {
    this.setState({
      reminders: data.data,
    });
  });
};

viewReminder = (id) => {
  MentalHealthService.getReminder(id)
      .then((data) => {
          this.setState({
              reminder: data.data,
              
          })
          this.loadComments(id);
      })
};


deleteReminder = (id) => {
  MentalHealthService.deleteReminder(id)
      .then(() => {
          this.loadReminders();
      });
  };

  addReminder = (name,quantity,start_date,end_date,publish_time) => {
  MentalHealthService.addReminder(name,quantity,start_date,end_date,publish_time)
      .then(() => {
        this.loadReminders();
      });
  };
  
  loadMoods= () => {
    MentalHealthService.fetchMoods().then((data) => {
      this.setState({
        moods: data.data,
      });
    });
  };
  
  addHistoryMood = (category,description) => {
    MentalHealthService.addHistoryMood(category,description)
      .then(() => {
        this.loadHistoryMood();
      });
  };
  
  loadHistoryMood = () => {
    MentalHealthService.fetchHistoryMood().then((data) => {
      this.setState({
        historyMoods: data.data,
      });
    });
  };

  editReminder = (id,name,quantity,start_date,end_date,publish_time) => {
  MentalHealthService.editReminder(id, name,quantity,start_date,end_date,publish_time)
      .then(() => {
        this.loadReminders();
      });
  };
  
  viewMyPosts = () => {
    MentalHealthService.fetchMyPosts().then((data) => {
      this.setState({
        myPosts: data.data,
      });
    });
  };

  loadComments= (id) => {
    MentalHealthService.fetchComments(id).then((data) => {
      this.setState({
        comments: data.data,
      });
    });
  };
  

  
  exportHistoryMood = () => {
  MentalHealthService.exportHistoryMood()
      
};

addComment = (id,content) => {
  MentalHealthService.addComment(id,content)
      .then(() => {
        this.loadPosts();
      });
  };




afterLogin = () =>{
  this.loadPosts();
   this.viewMyPosts();
   this.loadMoods();
   this.loadReminders();
   this.loadHistoryMood();
};

}

export default App;