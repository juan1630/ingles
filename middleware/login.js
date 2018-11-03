const User = require('../models/user').User;
module.exports = (req, res, next)=>{
   
     if(!req.session._id ){
        res.redirect("/login");
    }else{
      
        User.findById(req.session._id, (error, user)=>{
            console.log(user.nombre)
                if(error) res.redirect("/login")
               if (user){

                res.locals = {
                    user
                }
                    next();
               }
        })

        
    }
}