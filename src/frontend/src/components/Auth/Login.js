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
             //props.onLogin();
             navigate("/");
           }
         })
         .catch(function(error){
           console.log(error,'error');
         });
     }
 }

    return(
        
        <div style={{minHeight:800, marginTop:30}}>
       
          <div style={{marginTop:30}}>
          {
            fetchToken()
             ?(
              <p>you are logged in</p>
            ):(
               
                // <div>

                //    <form>
                //        <label style={{marginRight: 10 }}>Input Username</label>
                //        <input type='text' onChange={(e)=>setUsername(e.target.value)}/>

                //        <label style={{marginRight: 10 }}>Input Password</label>
                //        <input type='text' onChange={(e)=>setPassword(e.target.value)}/>

                //        <button type='button' onClick={login}>Login</button>   
                //    </form>

                // </div>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-16">
                <div className="max-w-md w-full space-y-8">
                  <div>
                    <img
                      className="mx-auto h-12 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      Login
                    </h2>
                  </div>
                  <form className="mt-16 space-y-6" >
                    <div className="rounded-lg shadow-lg -space-y-px">
                      <div>
                        <label htmlFor="username" className="sr-only">
                          Username
                        </label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Username"
                          onChange={(e)=>setUsername(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Password"
                          onChange={(e)=>setPassword(e.target.value)}
                        />
                      </div>
      
                     
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={login}>
                        Login
                      </button>
                     
                    </div>
                  </form>
                </div>
              </div>
            )
          }
          </div>
        </div>  
        
    )
}