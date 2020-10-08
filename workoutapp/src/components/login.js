import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { login, setToken, updateHeaderOptions } from "../api";
import jwt_decode from "jwt-decode";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const LoginView = (props) => {
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState("");
  const history = useHistory();


  const handleSubmit = async(event) => {
    event.preventDefault();
    const userDetails = {username, password}
    let isValid = true;

    const response = await login(userDetails).then((token) =>{
      console.log(token)

      let decoded = jwt_decode(token);
      console.log('decoded', decoded);

      window.localStorage.setItem('user', JSON.stringify(decoded.user));
      window.localStorage.setItem('token', token);
      setToken(token);
      props.setLoggedIn(true);
      updateHeaderOptions();
      history.push("/profile");

    }).catch((error) =>{
          console.log(error)
          isValid = false
    })
    if(!isValid){
      return
    }

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
      marginTop: theme.spacing(1),
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
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            autoComplete="email"
            type="text"
            name="username"
            onChange={onChangeField}
            value={username}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            name="password"
            onChange={onChangeField}
            value={password}            
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
            <Link to="/create-account">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

    </>
  );
};
export default LoginView;