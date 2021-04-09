
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const maxAge = 3*24*60*60

const createToken = (id)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: maxAge})
}

const handleErrors = (err)=>{
  console.log(err.message, err.code)
  let errors = {email:'', password:''}
  // incorrect email
  if(err.message === 'Email không đúng'){
    errors.email = 'Email chưa đăng kí'
  }
  if(err.message === 'Mật khẩu không đúng'){
    errors.password = 'Mật khẩu không đúng'
  }

  // duplicate error code
  if(err.code === 11000){
    errors.email = 'Email đã tồn tại'
    return errors;
  }

  // validation errors
  if(err.message.includes('users validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}




class AuthController{

  // [GET] /auth
  index(req, res){
    res.render('auth')
  }

  //  [POST] /auth/login
  async login_post(req, res){
    const {email, password} = req.body;
    try{
      const user = await User.login(email, password);
      const token = createToken(user._id)
      res.cookie('token', token)
      res.status(200).json({user: user._id})
    }catch (err){
      const errors = handleErrors(err)
      
      res.status(400).json({errors});
    }
    
  }


  // [POST] /auth/register
 async register_post(req, res, next){
    const { name, email, password} = req.body;
    try{
      const user = new User({
        fullName: name, 
        email : email,
        password: password,
      })
      await user.save();
      res.json({user: user, success:'dang ki thanh cong'})
    }catch (err){
      const errors = handleErrors(err)
      res.status(400).json({ errors });
    }
  }

  logout(req, res){
    res.cookie('token','', { maxAge: 1})
    res.redirect('/')
  }


}

module.exports = new AuthController;