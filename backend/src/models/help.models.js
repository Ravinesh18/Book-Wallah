import mongoose , {Schema} from "mongoose";


const helpSchema  = new Schema ({
     name :{
      type : String ,
      required : true
     },
     title :{
        type : String ,
        required : true 

     },
     description:{
        type : String ,
        required : true 


     },
     contactDetails:{
        type : String ,
        required : true 

     }


} , {
    timestamps:true 
})

export const Help  = mongoose.model("Help" , helpSchema)