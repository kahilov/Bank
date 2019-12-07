import React, { useState, useEffect, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const string = "";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(70),
    width: 200
  }
}));

export default function DatePickers(props) {
  const formatDate = props.formatDate;
  const classes = useStyles();
  const defaultValue = formatDate();
  let [value, setValue] = useState(string);
  const handleDate = props.handleDate;
  return (
    <form className={classes.container} noValidate>
      <TextField
        onChange={e => {
          setValue((value = e.target.value));
          handleDate(value);
        }}
        id="date"
        label="Transaction Date"
        type="date"
        defaultValue={defaultValue}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}
