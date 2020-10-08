import React, { useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import "fontsource-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import "fontsource-roboto";
import Button from "@material-ui/core/Button";

import Navi from "./components/nav";

import ExercisesView from "./components/exercises/exercises";
import AddExercisesView from "./components/exercises/add";
import EditExercisesView from "./components/exercises/edit";

import WorkoutsView from "./components/workouts/workouts";
import WorkoutView from "./components/workouts/workout";
import AddWorkoutsView from "./components/workouts/add";
import EditWorkoutsView from "./components/workouts/edit";
import SavedWorkoutsView from "./components/workouts/saved";

import ProfileView from "./components/profile/profile";
import EditProfileView from "./components/profile/edit";

import LoginView from "./components/login";
import SignupView from "./components/signup";
import LogoutView from "./components/logout";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const history = useHistory();

  const updateData = (e) =>{
      const key = e.currentTarget.name;

      const value = e.currentTarget.value;
      let obj = {...formData}
      obj[key] = value;
      setFormData(obj);
  }
}

const intializeLogin = () => {
  if (window.localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

function App() {
  const [loggedIn, setLoggedIn] = useState(intializeLogin());
  const [user, setUser] = useState({});

  const history = useHistory();

  const logout = () => {
    window.localStorage.clear();
    setLoggedIn(false);
    // history.push('/login');
  };

  return (
    <Router>
      <div>
        <Navi logout={logout} loggedIn={loggedIn} />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact component={AddExercisesView} path="/exercises/add" />
          <Route exact component={EditExercisesView} path="/exercises/edit" />
          <Route exact component={ExercisesView} path="/exercises" />

          <Route exact component={WorkoutsView} path="/workouts" />
          <Route exact component={WorkoutView} path="/workouts/view/:id" />
          <Route
            strict
            exact
            component={AddWorkoutsView}
            path="/workouts/add"
          />
          <Route exact component={EditWorkoutsView} path="/workouts/edit" />
          <Route exact component={SavedWorkoutsView} path="/workouts/saved" />

          <Route exact component={ProfileView} path="/profile" />
          <Route exact component={EditProfileView} path="/profile/edit" />

          <Route exact component={LoginView} path="/log-in">
            <LoginView setLoggedIn={setLoggedIn} setUser={setUser} />
          </Route>
          <Route exact component={LogoutView} path="/log-out" />
          <Route exact component={SignupView} path="/create-account" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
