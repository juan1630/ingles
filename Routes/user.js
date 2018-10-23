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

router.route("/")
.get((req, res)=>{
    res.render("user/user");
})

module.exports = router;