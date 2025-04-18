import mongoose ,{Schema} from "mongoose"
import mailSender from "../utils/mailSender.js";

const otpSchema = new Schema ({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000,
    }
})
// a function to send mails
async function sendVerifificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email, "Verification Mail from StudyNotion", otp);
        console.log('Email sent successfully', mailResponse)

    }
    catch(e){
        console.log('Error sending email',e);
        throw e;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerifificationEmail(this.email,this.otp);
    next();
})
export const OTP = mongoose.model("OTP", otpSchema);

