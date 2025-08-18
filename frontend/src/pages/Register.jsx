import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

function Register() {
    const nav = useNavigate()
    let {loginUser} = useContext(AuthContext)

    var RegisterUser = async(e) =>{
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL

        let response = await fetch(
          `${url}register/`,{
            method: "POST",
            headers:{
              'Content-Type' : 'application/json',
             
            },
            body :JSON.stringify({
                                  'username' :e.target.username.value,
                                    'email':e.target.email.value,
                                  'password' :e.target.password.value,
                                  
                                  })
          }
        )
        let data = await response.json()
                
                if (response.status ==200){
                  loginUser(e)
                  nav('/')
      }
    }
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      
      <form onSubmit={RegisterUser} className="flex flex-col justify-center items-center space-y-2">
        <input 
          type="text" 
          name="username" 
          placeholder="Enter User Name" 
          className='outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300' 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Enter User Email" 
          className='outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300'  
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Enter Password" 
          className='outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300'  
        />
        <input 
          type="submit" 
          value="Register" 
          className='w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2'  
        />
    </form>
    <h1>Already have an account?? <a href="/login" className='text-cyan-500'>Log in</a></h1>
 
      
    </div>
  )
}

export default Register