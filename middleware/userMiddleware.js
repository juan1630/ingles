module.exports = (req, res)=>{
    if( req.session.role === "usuario" ){
        res.render("user/user");
    }else{
        res.redirect("/login");
    }
}