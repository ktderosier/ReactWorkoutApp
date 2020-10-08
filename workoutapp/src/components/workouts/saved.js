import React, { useState, useEffect } from "react";
import {savedWorkouts} from "../../api";

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import 'fontsource-roboto';

const SavedWorkoutsView = () => {
  const [workoutsData, setWorkoutsData] = useState([]);
  useEffect(()=>{
    savedWorkouts().then(data => {
        console.log("data,", data)
          setWorkoutsData(data);
      })
  },
  []
  );
    return (
       <div>Favorited Workouts</div>
    )
  }

export default SavedWorkoutsView;