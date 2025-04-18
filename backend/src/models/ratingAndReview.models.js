import mongoose , {Schema} from "mongoose";

const ratingAndReviewSchema  = new Schema({

    name :{
        type : Schema.Types.ObjectId ,
        ref : "User"
    },
    book:{
        type :Schema.Types.ObjectId ,
        ref : "Book"
    },
    rating :{
        type : Number,
        required : true 
    },
    review :{
        type : String ,
        required : true 
    }
     
},{
    timestamps : true
})

export const RatingAndReview = mongoose.model("RatingAndReview" , ratingAndReviewSchema)