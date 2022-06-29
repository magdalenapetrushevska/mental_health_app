import React from 'react';
import {useNavigate} from "react-router-dom";


const Header = (props) => {

    const navigate = useNavigate()

    const signOut = ()=> {
       
      localStorage.removeItem('temitope')
      navigate('/')
  
    }

    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light  navbar-dark bg-primary">
  <a class="navbar-brand" href="/mood-history">MentalHealthApp</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link " href="/mood-history">Mood Tracker <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="/posts">Forum</a>
      <a class="nav-item nav-link mr-5 pr-5" href="/reminders">Med Reminders</a>
      <button class="btn btn-secondary ml-5 pl-5" onClick = {signOut}>Sign out</button>
    </div>
  </div>
</nav>

        </>
    )
}

export default Header;