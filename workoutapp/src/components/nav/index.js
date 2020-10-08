import React from "react";
import { Link } from "react-router-dom";
import "fontsource-roboto";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import PersonIcon from '@material-ui/icons/Person';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

export default function Navi(props) {
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    props.logout(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/profile">
            <Button variant="secondary">
              <MenuItem onClick={handleClose}><PersonIcon></PersonIcon></MenuItem>
            </Button>
          </Link>
          <Link to="/workouts/saved">
            <Button variant="secondary">
              <MenuItem onClick={handleClose}><FavoriteOutlinedIcon color="action"></FavoriteOutlinedIcon></MenuItem>
            </Button>
          </Link>
          <Link to="/workouts">
            <Button variant="secondary">
              <MenuItem onClick={handleClose}><FitnessCenterIcon></FitnessCenterIcon></MenuItem>
            </Button>
          </Link>
          <Link to="/exercises">
            <Button variant="secondary">
              <MenuItem onClick={handleClose}><FormatListBulletedIcon></FormatListBulletedIcon></MenuItem>
            </Button>
          </Link>
          <MenuItem onClick={handleClose}>
            {" "}
            {props.loggedIn ? (
              <Button variant="secondary" onClick={props.logout}>
                Logout
              </Button>
            ) : (
              <Link to="/log-in">
                <Button variant="secondary" color="primary">
                  Login
                </Button>
              </Link>
            )}
          </MenuItem>

          <MenuItem onClick={handleClose}>
            {" "}
            {props.loggedIn ? (
              <div></div>
            ) : (
              <Button variant="secondary">
                <Link to="/create-account">Create account</Link>
              </Button>
            )}
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
