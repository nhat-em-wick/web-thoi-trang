
class MeController{

  wishlist(req, res){
    res.render('front/me/wishlist')
  }
  compare(req, res){
    res.render('front/me/compare')
  }
}

module.exports = new MeController