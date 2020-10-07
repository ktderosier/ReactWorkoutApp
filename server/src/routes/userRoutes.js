const express   = require("express");
const router    = express.Router();
const User      = require('../models/User');
const bcrypt    = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const secretKey = '249b04b2-8312-432b-b145-5a0eff40c1b8'; //GUID



router.post('/new', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await User.create(req.body);     
    res.send(data);    
});

router.post('/login', async (req, res) => {
    console.log("req body", req.body)
    try {
    const user = await User.findOne({username: req.body.username});
   
    if(user) {        
        //add to session
    if(bcrypt.compareSync(req.body.password, user.password)){
        const payload = {
            id: user._id,
            user: user.username
        };
        jwt.sign(payload, secretKey, {expiresIn: '1h'}, (err, token) => {
            res.set('token', token);
            res.send(token);
        })
    } else {
        res.status(404).send();
    }
    } else {
        res.status(404).send();
    }
} catch(err){
    res.status(404).send(err);
}
     
});

////middleware
router.use((req, res, next) => {
    const token = req.get('token');

    jwt.verify(token, secretKey, {algorithms: ["HS256"]}, (err, decode) => {
        if(!err) {
            req.user = decode;
            next();
        }
        else {
            res.status(401).send('please login');
        }
    })
})

router.get('/logout', (req, res) => {
    //destroy session      
    req.session.destroy(() => {
        res.send('logged out');
    });    
});


///Edit user info

router.patch('/profile/update', async (req, res) => {
    console.log('req.body', req.body)
    try {
        const data = await User.findByIdAndUpdate(req.user.id, {profile: req.body}, {new: true});
        res.json(data);
        console.log(data);
    } catch (e) {
        res.status(400).send("bad request");
    }   
});

//get user info

router.get('/profile', async (req, res) => {
    const data = await User.findById(req.user.id);
    console.log(data);
    res.send(data.profile)

})

module.exports = router;