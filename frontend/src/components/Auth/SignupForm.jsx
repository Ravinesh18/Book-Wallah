import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../../slices/authSlice'
import { sendOtp } from '../../operations/apiServices/authApi'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        username: "",
        favouriteGenre: [""] // Initial state with one genre input field
    })

    const [showPassword, setShowPassword] = useState(false)
    const { fullname, email, password, username, favouriteGenre } = formData

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleGenreChange = (index, value) => {
        const newFavouriteGenre = [...favouriteGenre]
        newFavouriteGenre[index] = value
        setFormData((prevData) => ({
            ...prevData,
            favouriteGenre: newFavouriteGenre
        }))
        console.log(formData)
    }

    const handleAddGenre = () => {
        setFormData((prevData) => ({
            ...prevData,
            favouriteGenre: [...prevData.favouriteGenre, ""]
        }))
    }

    const handleRemoveGenre = (index) => {
        const newFavouriteGenre = favouriteGenre.filter((_, i) => i !== index)
        setFormData((prevData) => ({
            ...prevData,
            favouriteGenre: newFavouriteGenre
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const signupData = { ...formData }
        

        dispatch(setSignupData(signupData))
        dispatch(sendOtp(email, navigate))
        setFormData({
            fullname: "",
            email: "",
            password: "",
            username: "",
            favouriteGenre: [""]
        })
    }

    return (
        <div className='w-[50%]'>

            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex w-[80%] mx-auto flex-col gap-y-8 p-5 m-2">
                <div className="flex flex-col gap-y-4">
                    <p className=' text-2xl text-slate-400 italic mb-2 font-semibold'>Hey Folks! Join us to explore a new world</p>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Full Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="fullname"
                            value={fullname}
                            onChange={handleOnChange}
                            placeholder="Enter name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Username <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleOnChange}
                            placeholder="Enter Username"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder="Enter email address"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                    
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-pink-200">*</sup>
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
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>

                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Favorite Genres
                        </p>
                        {favouriteGenre.map((genre, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    value={genre}
                                    onChange={(e) => handleGenreChange(index, e.target.value)}
                                    placeholder={`Genre ${index + 1}`}
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                                <button type="button" onClick={() => handleRemoveGenre(index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddGenre} className="bg-green-500 text-white px-2 py-1 rounded">Add Genre</button>
                    </label>
                </div>
            
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-indigo-500 text-white py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm
