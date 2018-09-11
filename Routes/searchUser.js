const express = require('express');
const User = require('../models/user').User;
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("admin/admin");
});

router.route("/user/:_id")
    .get((req, res)=>{
        let id = req.params;

       // console.log(id);
        User.findById(id , (error, data)=>{
            if(error){
                console.log(error);
            }
            console.log("Buscando ---->")
            console.log(data);
        })
        res.redirect('/admin/user/'+data.id);
    })
    .put((req, res)=>{

    })
    
module.exports = router;
