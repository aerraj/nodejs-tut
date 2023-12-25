const mongoose = require("mongoose");



//define the schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title:
    {
        type: String,
    },
    gender: {
        type: String,
    }
},
    {
        timestamps: true
    })

//making a model
const User = mongoose.model("user", userSchema)

module.exports=User