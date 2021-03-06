const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const User = require('./models/user').User;
const auth = require('./middleware/userMiddleware');
const middleware = require('./middleware/login');
const auth_2 = require('./middleware/auth');
const { PORT }= require('./config/mongoConnect');
const {generatePdf} = require('./PdfService/index');
const session =require('express-session');
const methodOverride = require('method-override');

const bcrypt= require('bcrypt');
//const validate = require('./loginService/index');
const app = express();

const  search  = require('./Routes/searchUser');
const user = require ('./Routes/user');

app.use(express.static(path.join(__dirname, "/public/")));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride("_method"))
app.use(methodOverride('X-HTTP-Method-Override'));

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
   
    
 
        var nombre =req.body.name;
        var  apellido= req.body.apellido;
        var numeroControl=req.body.num;
        var  carrera=req.body.carrera;
        var semestre=req.body.semestre;
        var correo=req.body.email;
        var pass= bcrypt.hashSync(req.body.pass, 10)
    


        var Nom =nombre.toLowerCase();
        var ape=apellido.toLowerCase();
        var car=carrera.toLowerCase();
       
        
    let user ={
        nombre:Nom,
        apellido:ape,
         numeroControl,
        carrera:car,
        semestre:semestre,
        correo:correo,
        pass:pass
    }

    const usuario = new User( user );
        usuario.save((error)=>{
          
            if(error){
                res.redirect("/login");
            }else{
                res.render('user/user');
            }
        })
})

app.post("/login", (req, res)=>{

    let correoE = req.body.email;
    let contra = req.body.password;

        
    User.findOne({correo:correoE}, (error, user) => {
        
        if(error){
            res.redirect("/login");
        }
       // console.log(user)
        if(user){
           bcrypt.compare(contra, user.pass)
           .then((resp)=>{
              
              if(resp == true ){
              
                if(user.role === "usuario" ){
                   
                    req.session._id=user._id;
                    req.session.nombre= user.nombre;
                    req.session.role=user.role;
                    req.session.nivel=user.nivel;
                    
                    res.redirect("/user");

                }else if(user.role === "admin"){
                   
                    req.session._id=user._id;
                    req.session.nombre= user.nombre;
                    req.session.role=user.role;
                    req.session.nivel=user.nivel;
                    
                    res.redirect("/admin");
               }else{
                res.redirect("/login");
            }
            
        
           }
           if(resp === false){
               res.redirect("/login");
           }
        }).catch((error)=>{
            if(error){
                res.redirect("/login");
            }
            
        })
        }
        
})
})



app.get("/pdf", (req, res)=>{

    console.log(req.session);
    if (req.session.nombre == null || req.session.nombre == undefined){
        res.redirect("/login");
    }

        let data = {
            id: req.session._id,
            nombre:req.session.nombre,
            nivel:req.session.nivel
         }
        
        if( generatePdf(data) == false){
            res.redirect("/login");
        }else{
            res.redirect(`${data.id}.pdf`);
     
        }
         


})

app.use("/admin",middleware);
app.use("/admin", search );
app.use("/user", auth);
app.use("/user", auth_2);
app.use("/user", user);










/***
 * SERVIDOR 
 */

app.listen(PORT, (error)=>{
    console.log(`Servidor en el puerto: ${PORT}`);
    if(error){
        console.log(error)
    }
})