import mongoose ,{Schema} from "mongoose"

const genreSchema = new Schema ({
    genreName:{
        type:String,
        required:true
    },
    book:[{
        type: Schema.Types.ObjectId,
    }]
})
export const Genre = mongoose.model("Genre", genreSchema);

