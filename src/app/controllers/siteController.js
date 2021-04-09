
class SiteController {

    // [GET] /
     index(req, res, next){
        res.render('index')
    }
    
    contact(req, res){
      res.render('contact')
    }

    about(req, res){
      res.render('about')
    }
  
}

module.exports = new SiteController;