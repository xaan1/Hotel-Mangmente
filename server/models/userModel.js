
import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },


    isAdmin: {
        type: Boolean,
        default: false // Default is false, meaning regular user
    },
    phone : {
        type: String,
       default: '0000000000'

    },

    image : {
        type: String,
        default: 'profile pic'
    }
})


const userModel = mongoose.model('users', userSchema)

export default userModel