import React, { useState, useEffect } from "react";
import {
  getExercises,
  addWorkout,
  getWorkouts,
  addExerciseToWorkout,
} from "../../api";
import { Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import SaveIcon from "@material-ui/icons/Save";
import Container from "@material-ui/core/Container";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "fontsource-roboto";

const AddWorkoutsView = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    addWorkoutHandler();
    console.log("submit click");
  };
  const [exercises, setExercises] = useState([]);
  const [workoutsData, setWorkoutsData] = useState([]);

  useEffect(() => {
    refreshExercises();
    getWorkouts().then((data) => {
      setWorkoutsData(data);
    });
  }, []);

  const refreshExercises = async () => {
    const data = await getExercises();
    setExercises(data);
  };

  const [added, setAdded] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ msg: "", state: false });
  const [workoutSelected, setWorkoutSelected] = useState("");
  const [name, setName] = useState();

  const addWorkoutHandler = async () => {
    const workoutName = { name: name, bookmark: false };
    console.log("workout name", workoutName);
    try {
      const data = await addWorkout(workoutName);
      setSubmitMsg({ msg: "Workout added", state: true });
    } catch (e) {
      console.log(e);
      setSubmitMsg({
        msg: "Something went wrong, please try again!",
        state: false,
      });
    }
  };

  //exercise button
  const handleOnClick = (e) => {
    const payload = { workoutID: workoutSelected, exerciseID: e.target.value };
    addExerciseToWorkout(payload);
    setAdded(true);
    console.log("handle on click", e.target.value);
  };

  //workout button
  const handleWorkoutsChange = (e) => {
    console.log(e.target.value);
    setWorkoutSelected(e.target.value);
  };

  //new workout for
  const changeHandler = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    table: {
      minWidth: 700,
    },
  }));

  const classes = useStyles();

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <>
      <Container component={Paper}>
        <div>
          <h2>Add workout page</h2>
        </div>
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
            label="New workout name"
            onChange={changeHandler}
            value={name}
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
            Save
          </Button>
        </form>
      </Container>

      <TableContainer component={Paper}>

            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Exercise</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Muscle Type</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises.map((exercise) => {
                  return (
                    <StyledTableRow key={exercise._id}>
                      <StyledTableCell>{exercise.name}</StyledTableCell>
                      <StyledTableCell>{exercise.description}</StyledTableCell>
                      <StyledTableCell>{exercise.muscleType}</StyledTableCell>
                      <StyledTableCell>
                        <Form.Control
                          as="select"
                          custom
                          onChange={handleWorkoutsChange}
                        >
                          <option>Select workout</option>
                          {workoutsData.map((workout) => {
                            return (
                              <option value={workout._id}>
                                {workout.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                        <Button
                          onClick={handleOnClick}
                          value={exercise._id}
                          variant="info"
                        >
                          Add to workout
                        </Button>
                        {added ? <h3> Exercise added</h3> : null}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div>
        <Link to={"/exercises/add"}>
          <div className={classes.root}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </Link>
      </div>
      </TableContainer>
    </>
  );
};

export default AddWorkoutsView;
