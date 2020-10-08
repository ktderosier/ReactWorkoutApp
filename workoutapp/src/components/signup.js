import React, {useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { createAccount } from "../api";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import jwt from "jwt-decode";
// import moment from "moment";

const SignupView = () => {
    const [username, setUsername] = useState ("");
    const [password, setPassword] = useState("");
    let history = useHistory();
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const userDetails = {username, password}
      createAccount(userDetails);
      history.push("/profile");
    };
  
    const onChangeField = (e) => {
      if (e.target.name === "username"){
          setUsername (e.target.value)
      } else {
          setPassword (e.target.value)
      }
    }

    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

    const classes = useStyles();


  
    return (
<>

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                type="text"
                name="username"
                onChange={onChangeField}
                value={username}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                onChange={onChangeField}
                value={password}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/log-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </>




      // <div>
      //   <div>Create Account</div>
  
      //   <div>
      //     <form onSubmit={handleSubmit}>
      //       <label>
      //         Username:
      //         <input
      //           type="text"
      //           name="username"
      //            onChange={onChangeField}
      //            value={username}
      //         />
      //       </label>
  
      //       <label>
      //         Password:
      //         <input
      //           type="password"
      //           name="password"
      //            onChange={onChangeField}
      //            value={password}
      //         />
      //       </label>
  
      //       <input type="submit" value="Submit" />
      //     </form>
      //   </div>
      // </div>
    );
  };

  export default SignupView;
