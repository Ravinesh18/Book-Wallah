import React from 'react'
import register from '../assets/register.png'
import SignupForm from '../components/Auth/SignupForm'
const SignupPage = () => {
  return (
    <div className='w-11/12 flex space-x-14 h-[100vh]  mx-auto items-center justify-center -translate-y-14'>
        <img className='rounded-md shadow-lg w-[35%] h-[50%]' src={register}/>
        <SignupForm/>
    </div>
  )
}

export default SignupPage