const mongoose = require('mongoose')

async function connect(){
  try {
    await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      console.log('connect db success')
  } catch (error) {
    console.log('connect db fail')
  }
}

module.exports = {connect};