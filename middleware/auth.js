
module.exports = (req, res, next)=>{
if( req.session.role === "usuario" ){
    next();      
    }
}