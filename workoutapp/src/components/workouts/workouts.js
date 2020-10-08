import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { getWorkouts, bookmarkWorkout } from "../../api";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import "fontsource-roboto";

const WorkoutsView = (props) => {
  const [workoutsData, setWorkoutsData] = useState([]);
  useEffect(() => {
    getWorkouts().then((data) => {
      console.log("data,", data);
      setWorkoutsData(data);
    });
  }, []);

  console.log(props);
  const [isSaved, setIsSaved] = useState();

  const handleRemoveButtonOnClick = (workoutId) => {
    console.log("handleRemoveButtonOnClick:::: ", workoutId);
  };

  const handleSaveButtonOnClick = (workoutId) => {
    bookmarkWorkout(workoutId);
    setIsSaved(true);
    console.log("handleSaveButtonOnClick:::: ", workoutId);
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
    <TableContainer component={Paper}>
      <h1>All workouts page</h1>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Muscle group</StyledTableCell>
            <StyledTableCell>Favorite</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workoutsData.map((workout) => {
            return (
              <StyledTableRow key={workout._id}>
                <StyledTableCell>
                  <Link to={`/workouts/view/${workout._id}`}>
                    <Button>{workout.name}</Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>{workout.muscleGroup}</StyledTableCell>
                <StyledTableCell>
                  {workout.isSaved ? (
                    <Button
                      variant="contained"
                      onClick={() => handleRemoveButtonOnClick(workout._id)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => handleSaveButtonOnClick(workout._id)}
                    >
                      {workout.isSaved ? (
                        <FavoriteBorderIcon />
                      ) : (
                        <FavoriteIcon color="action" />
                      )}
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <div>
        <Link to={"/workouts/add"}>
          <div className={classes.root}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </Link>
      </div>
    </TableContainer>
  );
};

export default withRouter(WorkoutsView);
