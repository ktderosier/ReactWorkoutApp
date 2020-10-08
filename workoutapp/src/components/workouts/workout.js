import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useParams } from "react-router-dom";
import { getWorkout } from "../../api";
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";




const WorkoutView = (props) => {
  const params = useParams();
  const [added, setAdded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorkout(params.id).then((data) => {
      setLoading(false)
      setWorkout(data.name);
      setExercises(data.exercises)
      console.log("individ workout", data);
    });
  }, []);

  const handleOnClick = () => {
    setAdded(true);
    setClicked(true);
  };

  console.log("state..... ", added);


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
    <TableContainer component={Paper}>

    {loading && <p>Loading</p>}
    {!loading && 
      <div>
      <div>
        <p>{workout.name}</p>
        <Table className={classes.table} aria-label="customized table">
  <TableHead>
    <TableRow>
      <StyledTableCell>Exercise</StyledTableCell>
      <StyledTableCell>Description</StyledTableCell>
      <StyledTableCell>Muscle Type</StyledTableCell>
    </TableRow>
  </TableHead>
  <TableBody>
  {exercises.map((exercise) => {
    return(
    <TableRow key={exercise.id}>
      <StyledTableCell>{exercise.name}</StyledTableCell>
      <StyledTableCell>{exercise.description}</StyledTableCell>
      <StyledTableCell>{exercise.muscleType}</StyledTableCell>
    </TableRow>)})}
  </TableBody>
</Table>
      </div>
      {added ? <h3>Workout added</h3> : null}
      <Button onClick={handleOnClick}size="lg" variant="success">Add to saved workouts</Button>
    </div>
    
              }
                    <div>
        <Link to={`/workouts/saved`}>
          <Button variant="primary" size="lg" active>
            Add new exercise
          </Button>
        </Link>
      </div>

    </TableContainer>
    </>
  );
};

export default withRouter(WorkoutView);
