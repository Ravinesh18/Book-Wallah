import { useNavigate } from "react-router-dom";
import { endpoints } from "../apis";
import {apiConnector} from '../apiConnector'
const {LOGIN_API,SENDOTP_API,SIGNUP_API}= endpoints;
import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice"

export function sendOtp(email,navigate){
  return async (dispatch)=>{
     dispatch(setLoading(true));
    try{
       const response = await apiConnector('POST',SENDOTP_API,{email});
       console.log(response,'response')
    //  if(!response.data.success) {
    //   toast.error(response.data.message)
    //   throw new Error(response.data.message);
    // }
    toast.success("Otp sent successfully")
    navigate('/verify-otp')}
    catch(e){
      console.log(" Error", e);
      // toast.error(e.response.data.message);
      navigate('/login')
    }
   dispatch( setLoading(false))
  }
}

export function signUpUser(navigate,
  fullname,username, email, password,favouriteGenre,otp){
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try{
   
      const response = await apiConnector('POST',SIGNUP_API,{fullname,username, email, password,favouriteGenre,otp})
      
      if(!response.data.success) {
        throw new Error(response.data.message);
      }
      navigate('/login')
      toast.success("Account Created Successfully");
    }
    catch(err){
      console.log("Signup Error", err);
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false))
  }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
      
    const toastId = toast.loading("Loading...")
      try{
        const response = await apiConnector("POST",LOGIN_API,{email,password})
        console.log(response)
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
        toast.success("Login Succesfull");
        navigate('/dashboard/user-books')
        dispatch(setToken(response.data.data.accessToken))
        const profileImage = response.data?.data?.user?.profileImage
          ? response.data.data.user.profileImage
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.user.fullname} ${response.data.data.user.fullname}`
        dispatch(setUser({ ...response.data.data.user, profileImage: profileImage }))
        console.log(response.data.data.refreshToken)
        localStorage.setItem("token", JSON.stringify(response.data.data.accessToken))
        localStorage.setItem("user", JSON.stringify(response.data.data.user))
      }
      catch(error) {
        console.log("Login Error", error);
        toast.error(error.response.data.message);
      }
      toast.dismiss(toastId)
    }
  }

  export function logout(navigate) {
    return async (dispatch) => {
      try {
        // Clear tokens and user data from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
  
        // Clear Redux state
        dispatch(setToken(null));
        dispatch(setUser(null));
  
        // Navigate to the login page
        toast.success("Logged out successfully");
        navigate("/login");
      } catch (error) {
        console.error("Logout Error", error);
        toast.error("An error occurred during logout");
      }
    };
  }
  