const express = require('express');
const User = require('../models/user').User;
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

router.get("/", (req, res)=>{
    res.render("admin/admin");
});

router.route("/user")
.get((req, res)=>{
    res.send("Hola");
})
    .post((req, res)=>{
       console.log(req.body.numero);
       let num = req.body.numero;
       User.findOne({ numeroControl:num }, (erro,data)=>{
            if(erro) console.log(erro)            

            console.log(data);

        })
    })
    .put((req, res)=>{

    })
    
module.exports = router;
