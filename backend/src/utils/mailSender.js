import { createTransport } from 'nodemailer';

const mailSender = async (email,title,body)=>{
    try{
        let transporter = createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        
        let info = await transporter.sendMail({
            from:'BookWallah',
            to:`${email}`,
            subject:`${title}`,
            html: `${body}`
        })
        return info;
    }
    catch(e){
        console.log(e.message)
      }
}
export default mailSender