const mongoose = require("mongoose");
const {isEmail} = require('validator')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const userSchema = new Schema({
  fullName : {type: String, 
    required: [true, 'Vui lòng nhập tên']
  },
  email: {
  type: String, 
  required: [true, 'Vui lòng nhập email'],
   unique: true,
   validate: [isEmail, 'Vui lòng nhập đúng định dạng email']
  },
  password: {
  type: String,
  required: [true, 'Vui lòng nhập mật khẩu'],
  minLength: [6, 'Mật khẩu phải chứa ít nhất 6 ký tự']}
})

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// method login
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email})
  if(user){
    const auth = await bcrypt.compare(password, user.password)
    if(auth){
      return user
    }
    throw Error('Mật khẩu không đúng')
  }
  throw Error('Email không đúng')
}

module.exports = mongoose.model('users',userSchema)
