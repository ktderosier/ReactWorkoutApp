const express   = require("express");
const Exercise = require('../models/exercises');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretKey = '249b04b2-8312-432b-b145-5a0eff40c1b8'; //GUID

//public routes
router.get("/", async (req, res) => {
    const data = await Exercise.find(({}));
    res.send(data)
    console.log(data);
})

router.get("/:id", async (req, res) => {
    const data = await Exercise.findOne({_id: req.params.id});
});

//authenticated routes
//only allow if logged in


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


router.post('/new', async (req, res) => {
    console.log("exercise post", req.body)
    try {
        const data = await Exercise.create(req.body);
        res.json(data);
    } catch (e){
        console.log('exercise', e)
        res.status(400).send("bad request");
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const data = await Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }   
});

router.delete('/delete/:id', async (req, res) =>{
    try {
        const data = await Exercise.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }
});

module.exports = router;