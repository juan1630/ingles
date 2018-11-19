const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const User = require('./models/user').User;
const auth = require('./middleware/userMiddleware');
const middleware = require('./middleware/login');
const auth_2 = require('./middleware/auth');
const { PORT}= require('./config/mongoConnect');
const {generatePdf} = require('./PdfService/index');
const session =require('express-session');
const methodOverride = require('method-override');


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
                res.redirect("/login");
            }else{
                res.render('user/user');
            }
        })
})

app.post("/login", (req, res)=>{

    let correoE = req.body.email;
    let contra = req.body.password;

    User.findOne({correo:correoE, pass:contra}, (error, user) => {

            if (error) res.redirect("/login")
            
             if(user===null || user === undefined){
                 res.redirect("/login");                 
             }else if(user.role === undefined){
                 res.redirect("/login");
             }else if(user.role === "usuario" ){

                req.session._id=user._id;
                req.session.nombre= user.nombre;
                req.session.role=user.role;
                req.session.nivel=user.nivel;
                
                res.redirect("/user");

            }else if(user.role === "admin"){
                
                req.session._id=user._id;
                req.session.nombre=user.nombre;
                req.session.role=user.role;
                                
                res.redirect("/admin")
                
                }
        })
});



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


app.listen(PORT, ()=>{
    console.log(`Servidor en el puerto: ${PORT}`);
})