import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../operations/apiServices/authApi'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      })
      const navigate= useNavigate()
      const dispatch = useDispatch()
    
      const [showPassword, setShowPassword] = useState(false)
    
      const { username, password } = formData
    
      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(username,password)
        
        dispatch(login(username, password, navigate))
      }
    return (
        <form
          onSubmit={handleOnSubmit}
          className=" flex w-[40%] flex-col gap-y-4 "
        >
          <label className="w-full">
            <p className="mb-3 text-md font-semibold leading-[1.375rem]">
              Email Address Or Username <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="username"
              value={username}
              onChange={handleOnChange}
              placeholder="Enter username or email"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label className="relative">
            <p className="mb-3 text-md leading-[1.375rem] font-semibold">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[45px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <Link to="/forgot-password">
              <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                Forgot Password
              </p>
            </Link>
          </label>
          <button
            type="submit"
            className="mt-4 rounded-[8px] bg-indigo-500 py-[8px] px-[12px] font-medium text-white"
          >
            Sign In
          </button>
        </form>
      )
    }

export default LoginForm