const express = require('express');
const app = express();
const expressSession = require('express-session');
const User = require('../models/user').User;
const router = express.Router();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(expressSession({
    secret:"cookieSecretss",
    saveUninitialized: true,
    resave: true
}));

/****
 * Ver usuario y actualizar
 */
router.put("/edit/:id", ((req,res)=>{
    
    const id = req.params.id;
    const body =req.body;

        User.findByIdAndUpdate(id,body, (error, docs)=>{
        if(error) res.status(200).send({
            message:{
                error
            }
        }) (error)
        if(docs) res.redirect('/admin')
        
     })


}))


router.get("/", (req, res)=>{
    res.render("admin/admin");
});


router.route("/edit")
.post((req, res)=>{
    let id = req.body.numero;

    User.findOne({numeroControl:id},(error, user)=>{
        if(error) console.log(error)

       const nombre=user.nombre;
       const apellido=user.apellido;
       const semestre = user.semestre;
       const correo =user.correo;
       const nivel = user.nivel;
      const id =user._id;

        res.render('admin/userEdit', 
            { nombre,
            apellido,
            semestre,
            correo,
            nivel,
            id
        });

    })

    
})




router.route('/carrera')
.get((req,res)=>{
    res.render('admin/carrera');
})
router.route('/semestre')
.get((req, res)=>{
    res.render('admin/semestre');
})

/***
 * RENDER DEL FORMULARIO
 * **/

 router.route("/user")
 .get((req, res)=>{

 })
.post((req,res)=>{
    let num = req.body.numero;
      User.findOne({ numeroControl:num }, (erro,data)=>{
          if(erro){
              console.log(erro)
           }

          let id = data.id;
           res.redirect(`edit/${id}`);
       } )
})
/***
 * 
 * 
 * ***/


module.exports = router;