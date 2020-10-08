import React, { useState, useEffect } from "react";
import { getExercises, addExerciseToWorkout, getWorkouts } from "../../api";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import 'fontsource-roboto';



const ExercisesView = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    refreshExercises();
  }, []);

  const refreshExercises = async () => {
    const data = await getExercises();
    setExercises(data);
  };


  function FormDialog() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }




  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
      '& > *': {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
    FormDialog()

  };

  return (
    <>
      <div className={classes.root}>
        {exercises.map((exercise) => {
          return (
            <Chip
              icon={<AddCircleTwoToneIcon />}
              label={exercise.name}
              onClick={handleClick}
              onDelete={handleDelete}
              variant="default"
              color="default"
            />
          );
        })}{" "}
      </div>

      <div className={classes.root}>
        <Link to={"/exercises/add"}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </Link>
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      </div>

    </>
  );
};


export default ExercisesView;