const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');


const app = express();

app.use(bodyParser.json());
app.use(expressSession({
    secret:"cookieSecretss",
    saveUninitialized: true,
    resave: true
}));

const router = express.Router();


router.get("/",(req, res, next)=>{
    nombre=req.session.nombre;
    res.render("user/user",{nombre});  
});


router.get("/progreso",(req, res, next)=>{ 
    
    const User = require('../models/user').User;
    User.findById(req.session._id, (error, user)=>{
    
        if(error){ console.log(error) }
        
        const nombre = user.nombre;
        const apellido = user.apellido;
        const semestre = user.semestre;
        const correo =user.correo;
        const nivel = user.nivel;
        const status = user.status;
        const id = user._id;

        res.render("user/pro", {  
            nombre,
            apellido,
            semestre,
            correo,
            nivel,
            status,
            id
        });
        
        }) 

})


router.get("/cerrar", (req, res)=>{
    req.session.destroy();
    res.redirect("/login");
})



module.exports = router;