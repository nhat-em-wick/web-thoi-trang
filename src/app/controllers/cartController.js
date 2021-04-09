

class CartController{

  index(req, res){
    res.render('front/cart')
  }

}

module.exports = new CartController