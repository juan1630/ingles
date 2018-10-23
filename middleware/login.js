const User = require('../models/user').User;
module.exports = (req, res, next)=>{
    
     if(!req.session.user_id){
        res.redirect("/login");
    }else{

        User.findById(req.session.user_id, (error, user)=>{
            if(error){
            return  res.redirect("/login")
            }
               
                res.locals = {
                    user
                }
               // console.log(res.locals.user);
        })

        next();
    }
}