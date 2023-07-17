const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uuid:{
        type:String,
        require:true,
        unique: true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true,
        unique: true
    },
    fullName:{
        type:String,
        require:true,    
    },
    admin:{
        type:Boolean,
        require:true,
        default: false
    },
    creationTimeStamp:{
        type: Number,
        required:true,
        default: parseInt(Date.now() / 1000)
    }
})

module.exports = mongoose.model('user', userSchema)