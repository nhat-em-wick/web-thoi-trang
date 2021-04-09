
class ProductController{
  index(req, res){
    res.render('front/products')
  }

  detail(req, res){
    res.render('front/products/detail')
  }
}


module.exports = new ProductController