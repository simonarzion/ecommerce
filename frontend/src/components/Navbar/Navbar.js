import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, switchSignUp } from "../../redux/actions/";
import { useLocation, useHistory } from "react-router";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
    history.push("/auth");
  };

  useEffect(() => {
    setTimeout(() => {
      setUser(JSON.parse(localStorage.getItem("profile")));
    }, 1000);
  }, [location]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h5"
          className={classes.brand}
        >
          Ecommerce
        </Typography>

        {user ? (
          <div className={classes.profile}>
            <Avatar alt={user?.user.name} src={user?.user.imageUrl}></Avatar>
            <Typography variant="h6">{user?.user.name}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="default"
              onClick={() => dispatch(switchSignUp(true))}
            >
              Sign Up
            </Button>

            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="secondary"
              onClick={() => dispatch(switchSignUp(false))}
            >
              Sign In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
