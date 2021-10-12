import { Button, Container, Grid } from "@material-ui/core";
import React, { useState } from "react";
import Input from "../Input/Input";
import GoogleLogin from "react-google-login";
import useStyles from "./styles";
import { Icon } from "./icon";
import { useDispatch, useSelector } from "react-redux";
import { auth, switchSignUp } from "../../redux/actions";
import { useHistory } from "react-router";

const initialState = { first_name: "", last_name: "", email: "", password: "" };

const Sign = () => {
  const { isSignup } = useSelector((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSwitch = () => {
    dispatch(switchSignUp(!isSignup));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const googleSuccess = (response) => {
    console.log(response);
    dispatch(auth(response));
    history.push("/");
  };

  const googleFailure = (response) => {
    console.log(response);
  };
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Container maxWidth="sm">
        {isSignup && (
          <Grid container spacing={1}>
            <Input
              label={"First Name"}
              half
              handleChange={handleChange}
              type="text"
              name="first_name"
            />

            <Input
              label={"Last Name"}
              half
              handleChange={handleChange}
              name="last_name"
              type="text"
            />
          </Grid>
        )}

        <Grid container spacing={1}>
          <Input
            label={"Email"}
            handleChange={handleChange}
            type="email"
            name="email"
          />

          <Input
            label={"Password"}
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
            handleShowPassword={handleShowPassword}
          />

          {isSignup && (
            <Input
              label={"Repeat Password"}
              handleChange={handleChange}
              name="repeat_password"
              type="password"
            />
          )}
        </Grid>

        <Grid container spacing={1} className={classes.actionsContainer}>
          <Grid item xs={12}>
            {isSignup ? (
              <Button fullWidth variant="contained" color="primary">
                Sign Up
              </Button>
            ) : (
              <Button fullWidth variant="contained" color="primary">
                Sign In
              </Button>
            )}
          </Grid>

          <Grid item xs={12}>
            <GoogleLogin
              clientId="16274513599-l4bg11tu6a7rk7lo5hu5l3u93dfu64hq.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                >
                  Login With Google
                </Button>
              )}
            />
          </Grid>
        </Grid>

        <Button variant="text" color="primary" onClick={handleSwitch}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
        </Button>
      </Container>
    </form>
  );
};

export default Sign;
