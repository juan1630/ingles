const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const User = require('./models/user').User;
const auth = require('./middleware/userMiddleware');
const middleware = require('./middleware/login');
const { PORT } = require('./config/mongoConnect')
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
            if(error) res.redirect('/login')
       
            req.session.user_id=user._id;
            req.session.userName=user.nombre;
            req.session.role=user.role
       
                if(user===null){
                    res.redirect('/login');
                }
           
                if(error) console.log(error)
           
           if(user.role === "usuario" ){
              // console.log("Usuario");
                res.redirect("/user")
           }else if(user.role === "admin"){
              // console.log("Administrador");
                res.redirect("/admin")
              
              }
        })
});


app.use("/admin",middleware);
app.use("/admin", search );
app.use("/user", auth);
app.use("/user", user);

/***
 * SERVIDOR 
 */


app.listen(PORT, ()=>{
    console.log(`Servidor en el puerto:  ${PORT}`);
})