import { Grid, TextField } from "@material-ui/core";
import React from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { InputAdornment, IconButton } from "@material-ui/core";

const Input = ({
  label,
  half,
  handleChange,
  type,
  name,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      <TextField
        fullWidth
        name={name}
        label={label}
        variant="outlined"
        onChange={handleChange}
        type={type}
        required
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
