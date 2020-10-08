import React, { useState } from "react";
import { addExercise } from "../../api";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Container from "@material-ui/core/Container";
import "fontsource-roboto";

const AddExercisesView = (props) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [muscleType, setMuscleType] = useState();

  const [submitMsg, setSubmitMsg] = useState({ msg: "", state: false });
  const [redirectHome, setRedirectHome] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    addExerciseHandler();

    setName(""); //blank the form
    setDescription("");
  };

  const addExerciseHandler = async () => {
    const exerciseDetails = {
      name: name,
      description: description,
      muscleType: muscleType,
    };

    try {
      const data = await addExercise(exerciseDetails);
      setSubmitMsg({ msg: "Exercise Added, add another?", state: true });
    } catch (e) {
      console.log(e);
      setSubmitMsg({
        msg: "Something went wrong, please try again!",
        state: false,
      });
    }
  };

  const changeHandler = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "muscleType") {
      setMuscleType(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Container fixed>
      <div>
        <h3>Add new exercise</h3>
        <div>
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="text"
              name="name"
              id="standard-basic"
              label="New exercise name"
              onChange={changeHandler}
              value={name}
            />

            <TextField
              type="text"
              name="description"
              id="standard-basic"
              label="Description"
              onChange={changeHandler}
              value={description}
            />

            <TextField
              type="text"
              name="muscleType"
              id="standard-basic"
              label="Muscle targeted"
              onChange={changeHandler}
              value={muscleType}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              value="Submit"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Create new exercise
            </Button>
          </form>
        </div>
      </div>
      <Container>
      <Link to='/workouts/add'>
        <Button variant="contained" size="large">
          Back to workout page
        </Button>
      </Link>
      </Container>

    </Container>
  );
};

export default AddExercisesView;
