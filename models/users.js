import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    phone: String,
    fullName: String,
    address: String,
})

const UserCollection = mongoose.model('Users', UserSchema)
export default UserCollection;