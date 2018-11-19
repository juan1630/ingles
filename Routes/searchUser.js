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

/****
 * Render de la vista
 * 
 */
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
        const description = user.description;

        res.render('admin/userEdit', 
            { nombre,
            apellido,
            semestre,
            correo,
            nivel,
            id,
            description
        });

    })

    
})


router.route('/carrera')
.get((req,res)=>{
    res.render('admin/carrera');
})

/****
 * RENDER DE LA CARRERA
 * 
 */
router.route('/carrera/find')
.post((req, res)=>{
  
    console.log(req.body.carrera);

    let carr =req.body.carrera;

    User.find({carrera:carr}, (error, docs)=>{
        if(error) throw new Error

       if(docs) {
         //  console.log(docs)
           const user = {
               nombre:docs
               
           }
           // console.log(user)
                       
           res.render('admin/showCarrera',{data:user})
       }
    })

})

router.route('/semestre')
.get((req, res)=>{
    res.render('admin/semestre');
});
/***
 * RENDER DEL SEMESTRE
 * 
 */
router.route('/semestre/find')
.post((req, res)=>{
    const semestre = req.body.semestre;

    User.find({"semestre": semestre}, (error, docs)=>{
        if(error) res.render('admin/admin')

        if(docs){
            const users = {
                nombre:docs
            }
            res.render('admin/showSemestre', { data:users })
        }
    })

})
/***
 * RENDER DEL FORMULARIO
 * **/

 router.get("/grupo",(req, res)=>{
     res.render('admin/grupo')
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

router.get('/cerrar', (req, res)=>{
    req.session.destroy();
    res.redirect("/login");
})

module.exports = router;