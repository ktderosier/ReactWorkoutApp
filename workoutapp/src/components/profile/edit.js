import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { updateProfile } from "../../api";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "fontsource-roboto";

const EditProfileView = () => {
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfileHandler();
    history.push("/profile");
  };

  const [submitMsg, setSubmitMsg] = useState({ msg: "", state: false });
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();

  const updateProfileHandler = async () => {
    const profileDetails = {
      name: name,
      age: age,
      weight: weight,
      height: height,
    };
    try {
      const data = await updateProfile(profileDetails);
      console.log("clicked subimt profile", data);
      setSubmitMsg({ msg: "Profile Updated", state: true });
    } catch (e) {
      console.log(e);
      setSubmitMsg({
        msg: "Something went wrong, please try again!",
        state: false,
      });
    }
  };

  const changeHandler = (e) => {
    console.log("change handler");
    console.log({ eventTarget: e.target });

    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "age") {
      setAge(e.target.value);
    } else if (e.target.name == "height") {
      setHeight(e.target.value);
    } else {
      setWeight(e.target.value);
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
      <h1>Edit profile</h1>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="name"
          id="standard-basic"
          label="Name"
          onChange={changeHandler}
          value={name}
        />

        <TextField
          id="standard-basic"
          label="Age"
          type="number"
          name="age"
          onChange={changeHandler}
          value={age}
        />

        <TextField
          id="standard-basic"
          label="Height"
          type="number"
          name="height"
          onChange={changeHandler}
          value={height}
        />

        <TextField
          id="standard-basic"
          label="Weight"
          type="number"
          name="weight"
          onChange={changeHandler}
          value={weight}
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
  );
};

export default EditProfileView;
