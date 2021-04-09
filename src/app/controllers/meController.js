
class MeController{

  wishlist(req, res){
    res.render('me/wishlist')
  }
  compare(req, res){
    res.render('me/compare')
  }
}

module.exports = new MeController