const express = require("express");
const Workout = require("../models/workouts");
const Exercise = require("../models/exercises");
const router = express.Router();
const jwt = require('jsonwebtoken');


const secretKey = '249b04b2-8312-432b-b145-5a0eff40c1b8'; //GUID
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




router.get("/:id", async (req, res) => {
    console.log("req body", req.body)
    // console.log("req session", req.session)
    try {
        const workout = await Workout.findOne({owner: req.user.id, _id: req.params.id}).populate('exercises');
        console.log("backend workout", workout)
        // res.json(workout);
        res.status(200).json(workout);
    } catch (e){
        console.log("catch", e)
        res.status(400).send("bad request");

    }
})

router.get("/", async (req, res) => {
    try {
        const workout = await Workout.find({owner: req.user.id}).populate('exercises');
        res.json(workout);
    } catch (e) {
        console.log('e', e)
        res.status(400).send("bad request");

    }
})



router.post("/new", async (req, res) => {
    req.body.owner = req.user.id; //ensures logged in user owns this workout

    try {
        const workout = await Workout.create(req.body);
        res.json(workout);
    } catch (e) {
        console.log("workout create ", e)
        res.status(400).send("bad request")
    }

});

//add exercise to the workout

/*
    {
        workoutID: String,
        exerciseID: String
    }
*/

router.post('/exercises/add', async (req, res) => {
    try{
        const workout = await Workout.findOne({owner: req.user.id, _id: req.body.workoutID});
        const exercise = await Exercise.findOne({_id: req.body.exerciseID});
        console.log(workout, exercise);
        if(!workout || !exercise){
            res.status(400).send("bad request");
        } else {
            workout.exercises.push(exercise); //add exercise to worktout array
            const result = await workout.save();//save to database
    
            res.json(result);
        }
    } catch {
        res.status(400).send("bad request");

    }
})


router.patch('/exercise/remove', async (req, res) => {
    try {
        const workout = await Workout.findOne({owner: req.user.id, _id: req.body.listID}).populate('exercise');
        
        //filter out any matching ID
        workout.exercises = workout.exercises.filter((exercise) => {
            return exercise.id !== req.body.itemID
        });

        const result = await workout.save(); //update database
        res.json(result);
    } catch {
        res.status(400).send("bad request");
    }
})

//bookmark workout
router.patch('/bookmark/:workoutId/:save', async (req, res) => {
    console.log('bookmark params', req.params)
    console.log('user id', req.user.id)
    try {
        const data = await Workout.findByIdAndUpdate(req.params.workoutId, { bookmark: true }, {new: true});
       console.log('bookmark data', data)
        res.json(data);
    } catch {
        res.status(400).send("bad request");
    }
})

//get bookmarked workout

router.get("/saved", async (req, res) => {
    try {
        const savedWorkouts = await Workout.find(ownerId, {bookmark: true}, {ownerId: req.user.id})
        res.json(savedWorkouts);
        console.log('saved workouts', savedWorkouts)
    } catch (e) {
        console.log('e', e)
        res.status(400).send("bad request");
    }
})

module.exports = router;