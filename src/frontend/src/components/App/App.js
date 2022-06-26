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



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      

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

          <Route path="/" exact element={<Login />} />
            
          </Routes>
        </Router>
      </>
    );
  }

  componentDidMount() { 
   
  };
  

register = (username,password,phone_number) => {
  MentalHealthService.register(username,password,phone_number)
      
};





}

export default App;