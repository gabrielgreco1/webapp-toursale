const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        maxlength: [150, 'Your name must have less or equal then 150 characters'],
        minlength: [10, 'Your name must have more or equal then 10 characters']
      },
    email: {
        type: String, 
        required: [true, 'A user must submit an email adress'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Submit a valid email adress']
    },
    photo: String,
    password: {
        type: String, 
        required: [true, 'Please submit a password'],
        minlength: [8, 'A password must have more or equal then 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String, 
        required: [true, 'Please confirm his password'],
        maxlength: [18, 'A password must have less or equal then 18 characters'],
        minlength: [6, 'A password must have more or equal then 6 characters'],
        validate: {

            // This only works on SAVE!!!
            validator: function (con) {
                return con === this.password;
            },
            message: 'Passwords are not the same'
        }

    }
});

userSchema.pre('save', async function(next){
    // Only run ths function if password was actually modified
    if (!this.isModified('password')) return next()

    // encrypting user password
    this.password = await bcrypt.hash(this.password, 13)

    // After the successful validation this field is unnecessary
    this.passwordConfirm = undefined;
    next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword) 
}

const User = mongoose.model('User', userSchema);
module.exports = User;
