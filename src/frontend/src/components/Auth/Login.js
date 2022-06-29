import { useNavigate } from "react-router"
import { fetchToken, setToken } from "./Auth"
import { useState } from "react"
import axios from "axios"



export default function Login(props){
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  //check to see if the fields are not empty
  const login = ()=> {

     if(username=='' & password==''){
        return
     }else{
        // make api call to our backend. we'll leave thisfor later
         axios.post('http://localhost:8000/api/login',{
             username: username,
             password: password
             
         })
         .then(function(response){
           console.log(response.data.token,'response.data.token')
           if(response.data.token){
             setToken(response.data.token)
             props.afterLogin();
             navigate("/mood-history");
           }
         })
         .catch(function(error){
           console.log(error,'error');
         });
     }
 }

    return(
      <>
        

       
        <div style={{minHeight:800, marginTop:30}}>
       
          <div style={{marginTop:30}}>
          {
            fetchToken()
             ?(
              <p>you are logged in</p>
            ):(
               
            <>

              <div>
              <h2 class="ml-5">Login</h2>
          </div>
                <div class="row mt-5 ml-5">
                <div class="col-md-5 ml-5">
                    <form >
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input type="text"
                                   className="form-control"
                                   id="username"
                                   name="username"
                                   required
                                   placeholder="Enter username"
                                   onChange={(e)=>setUsername(e.target.value)}
                            />
                        </div><br/>
                        <div className="form-group">
                            <label htmlFor="price">Password</label>
                            <input type="password"
                                   className="form-control"
                                   id="password"
                                   name="password"
                                   placeholder="Enter password"
                                   required
                                   onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div><br/>
                        
                        <button id="submit" type="button" className="btn btn-primary" onClick={login}>Submit</button>
                    </form>
                </div>
            </div>
            </>
               
            )
          }
          </div>
        </div>  
        </> 
    )
}