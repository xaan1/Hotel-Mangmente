
import React, { useContext, useEffect, useState } from 'react'

import { NavLink, useNavigate} from  "react-router-dom"
import axios from 'axios'
import { AppContext } from '../context/AppContex'


const Login = () => {

    const [state , setState] = useState("Sign up")

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState("")




    
    const {    token, setToken,
        backEndUrl} = useContext(AppContext)


        const navigate = useNavigate()


      
    useEffect(() => {
        if(token){
            navigate('/')
        }
    },[token])


    const handleSubmit =async (e) => {
        e.preventDefault()
      

        if(state === 'Sign up'){
            const {data} =  await axios.post(`${backEndUrl}/api/users/signup`, {
                email, password, name
            })

            console.log(data)

            if(data.success){
                setState('Login')

            }
        } else {
            const {data} =  await axios.post(`${backEndUrl}/api/users/LoginUser`, {
                email, password
            })

            console.log(data)

            if(data.success){
                setToken(data.token)
                localStorage.setItem('token', data.token)
                navigate('/')
            }
        }

     
    }









  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex item-center'>

<div className="flex flex-col gap-3 p-8 m-auto items-center min-w-[390px] sm:min-w-96 border rounded-xl  text-zinc-700 text-sm shadow ">
   

    <p className='text-4xl font-semibold text-center'>

    {state === 'Sign up'  ?  "Create Account"  : "Login"}
    </p>


{
    state === 'Sign up' && 
    <div className='w-full'>
<label className="block  font-medium mb-1 text-2xl font-mono" htmlFor="">
            Full Name
          </label>
          <input
            type="text"
           
            
            required
            value={name}
            onChange={(e)=> setName(e.target.value)}
          
            className=" border border-zinc-300 w-full p-2 rounded"
            placeholder=" Enter your full name" />
</div>
}




<div className='w-full'>
<label className="block text-2xl font-mono font-medium mb-1" htmlFor="">
          Email
          </label>
          <input
            type="text"
           
            required
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          
            className=" border border-zinc-300 w-full p-2 rounded"
            placeholder=" Enter your Email" />
</div>


<div className='w-full'>
<label className="block text-2xl font-mono font-medium mb-1" htmlFor="">
            Password
          </label>
          <input
            type="text"
           
            required
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          
            className=" border border-zinc-300 w-full p-2 rounded"
            placeholder=" Enter your Password" />
</div>


<button
          type="submit"
          className="w-full bg-blue-500 text-black py-2 rounded hover:bg-blue-600 text-1xl font-semibold"
        >
           {
                state === 'Sign up' ? "Sign up" : "Login"
           }
        </button>





        {

state === 'Sign up'  ? <p onClick={()=> setState("Login")}   className='text-2xl   underline cursor-pointer '>
  Already Have Account? Login here
</p>   : <p   onClick={()=> setState("Sign up")} className='text-2xl   underline cursor-pointer '>
 Create an new Account
</p>
        }


</div>

    </form>
  )
}

export default Login