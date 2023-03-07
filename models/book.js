import mongoose from 'mongoose'
const BookSchema = new mongoose.Schema({
    author: String,
    title: String,
    ISBN:String,
    reviews: [{ 
        username:String,
        feedback:String
        }]
});

const Author = mongoose.model('books', BookSchema);
export default Author

