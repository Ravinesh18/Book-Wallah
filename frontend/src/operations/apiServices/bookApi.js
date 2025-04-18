import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
const { POST_BOOK } = endpoints

export function postbook(navigate,data,token){
    return async(dispatch)=>{
        const toastId = toast.loading("Updating Password...") 
      try{
        console.log(token)
        const response = await apiConnector("POST", POST_BOOK, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          })
        
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
        navigate('/dashboard/user-books')
        toast.success("Book uplaoded");
      }
      catch(err){
        console.log("Signup Error", err);
        toast.error(err.response.data.message);
      }
     toast.dismiss(toastId)
    }
  }