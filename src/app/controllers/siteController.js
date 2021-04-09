
class SiteController {

    // [GET] /
     index(req, res, next){
        res.render('front/index')
    }
    
    contact(req, res){
      res.render('front/contact')
    }

    about(req, res){
      res.render('front/about')
    }

    admin(req, res){
      res.render('back/index')
    }
  
}

module.exports = new SiteController;