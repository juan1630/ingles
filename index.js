const express = require('express');
const bodyParser = require('body-parser')
const User = require('./models/user').User;
const middleware = require('./middleware/login');
const {  } = require('./config/mongoConnect')
const session =require('express-session');


const app = express();

const  search  = require('./Routes/searchUser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(session({
    secret:"cookieSecrete",
    saveUninitialized: true,
    resave: true
}));


app.set('view engine', 'pug');

app.get("/", (req, res)=>{
    res.render('index');
});

app.get("/curso", (req, res)=>{
    res.render('curso');
})


app.get("/form", (req, res)=>{
    res.render('form');
});

app.get('/login', (req, res)=>{
    res.render('login');
})

app.post('/crear', (req ,res)=>{
   
    const user ={
 
        nombre:req.body.name,
        apellido:req.body.apellido,
        numeroControl:req.body.num,
        carrera:req.body.carrera,
        semestre:req.body.semestre,
        correo:req.body.email,
        pass:req.body.pass
    
    }
    
    const usuario = new User( user );
        //console.log(usuario);
        usuario.save((error)=>{
            if(error){
            return res.json({
                error
            });
            }else{
                res.render('user');
            }
        })
})

app.post("/login", (req, res)=>{

    let correoE = req.body.email;
    let contra = req.body.password;

    User.findOne({correo:correoE, pass:contra}, (error, user) => {
            if(error){
                 res.json({
                  message: error
               });
            }
           // console.log(user.numeroControl)
           //console.log(user.nombre);
           req.session.user_id=user._id;
           req.session.userName=user.nombre;


          // console.log(req.session.user._id);
          //console.log(req.session.userName);

           if(!user){
               console.log("Usuario no valido");
              
              res.render("login");
           }

           if(user.role === "usuario" ){
               console.log("Usuario");
                res.render("user")
           }

           if(user.role === "admin"){
              // console.log("Administrador");
                res.redirect("/admin")
              
              }
        })
});


app.use("/admin",middleware)
app.use("/admin", search );


app.listen(3000, ()=>{
    console.log("Servidor en el puerto 3000");
})