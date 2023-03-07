import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        min:2
    },
    password: {
        type: String,
        required: true,
        min:2
    },
    refreshToken: String
});

const User = mongoose.model('users', UserSchema);
export default User
