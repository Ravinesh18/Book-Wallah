import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Help} from "../models/help.models.js"

const createHelp = asyncHandler(async(req,res)=>{
    const {name , title , description , contactDetails} = req.body

    if (!name || !title || !description || !contactDetails) {
        throw new ApiError(400 , "All details required!")
    }

    const help = await Help.create({
        name , 
        title ,
        description ,
        contactDetails 
    })

    if (!help) {
        throw new ApiError(400 , "Help not created!")
    }

    return res
    .status(200).json(new ApiResponse(200 , help , "Help created succesfully!"))
})

export {
    createHelp
}