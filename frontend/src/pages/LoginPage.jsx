import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
import login from '../assets/login.png'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
const LoginPage = () => {
  const {loading} = useSelector((state)=>state.auth)
  return (
    <div className='w-11/12 flex space-x-20 h-[100vh]  mx-auto items-center justify-center -translate-y-14'>
        {/* {loading ? toast.loading('Loading...') : <></>} */}
        <img className='rounded-md shadow-lg w-[35%]  h-[60%]' src={login}/>
        <LoginForm/>
    </div>
  )
}

export default LoginPage