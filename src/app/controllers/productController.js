
class ProductController{
  index(req, res){
    res.render('products')
  }
}


module.exports = new ProductController