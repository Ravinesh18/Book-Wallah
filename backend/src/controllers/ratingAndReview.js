import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {RatingAndReview} from "../models/ratingAndReview.models.js"
import {User} from "../models/user.models.js" 
import {Book} from "../models/book.models.js"

const createRating = asyncHandler(async(req,res)=>{
    const {name , book , rating , review } = req.body

    if (!name || !book || !rating || !review) {
        throw new ApiError(400 , "All details required!")
    }

    const findbook = await Book.findOne(book);

    if (!findbookbook) {
        throw new ApiError(400  , "Book not found!")
    }

    const ratingAndReview = await RatingAndReview.create({
        name ,
        book , 
        rating , 
        review 
    })

    if (!ratingAndReview) {
        throw new ApiError(400 , "Rating and Review not created! ")
    }

    return res.status(200).json(
        new ApiResponse(200 , ratingAndReview , "Rating and Review added successfully")
    )
})

export {
    createRating
}