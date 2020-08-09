const express   = require("express");
const UserExercise = require('../models/userExercises');
const router = express.Router();

//public routes
router.get("/", async (req, res) => {
    const data = await UserExercise.find(({}));
    res.send(data)
    console.log(data);
})

router.get("/:id", async (req, res) => {
    const data = await UserExercise.findOne({_id: req.params.id});
});

//authenticated routes
//only allow if logged in


router.use((req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.status(401).send("Please login");
    }
});


router.post('/new', async (req, res) => {
    try {
        const data = await UserExercise.create(req.body);
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const data = await UserExercise.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }   
});

router.delete('/delete/:id', async (req, res) =>{
    try {
        const data = await UserExercise.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }
});

module.exports = router;