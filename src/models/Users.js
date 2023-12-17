const mongoose = require('mongoose')
const bycrpt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})

userSchema.pre('save', function(next){
    // since we are not using arrow function we can use this to get the particular object or user we are talking about
    const  user = this;

    // checks if we have not modified it we can move on to the next task
    if(!user.isModified('password')){
        return next()
    }
    bycrpt.genSalt(10, (err,salt)=>{
        if(err){
            return next(err)
        }
        bycrpt.hash(user.password, salt, (err, hash) =>{
            if (err){
                return next(err)
            }
            user.password = hash
            next()
        })

        
    })
    

})


// unhashing the password the user wants to use 
userSchema.methods.comparePassword = function(candidatePassword) {
    const user  = this;
    return new Promise((resolve, reject)=>{
        bycrpt.compare(candidatePassword,user.password , (err, isMatch)=>{
            if(err){
                return reject(err)
            }

            if (!isMatch){
                return reject(false);
            }

            resolve(true)
        })

    })
}

mongoose.model('User', userSchema)