const express = require('express')

const router = express.Router;

router.rote('/user')
    .post((request, response)=>{
        response.render('/admin/admin')
    })