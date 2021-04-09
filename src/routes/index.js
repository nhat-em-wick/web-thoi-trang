const siteRouter = require('./site')
const authRoute = require('./auth')
const productRoute = require('./product')
const cartRoute = require('./cart')
const meRoute = require('./me')
function route(app){

  app.use('/me', meRoute)
  app.use('/cart', cartRoute)
  app.use('/products', productRoute)
  app.use('/auth', authRoute)
  app.use('/',siteRouter)
  
}

module.exports = route;