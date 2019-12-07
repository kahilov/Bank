import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function Snackbars(props) {
  const classes = useStyles2();
  const [good, setOpen] = React.useState(false);
  const [bad, setBad] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const manageExpenses = props.manageExpenses;
  const inputs = props.input;
  const displayAlert = props.displayAlert;
  const withdraw = "withdraw";
  const handleClick = async (e, withdraw) => {
    if (
      inputs.amountInput != "" &&
      inputs.categoryInput != "" &&
      inputs.vendorInput != ""
    ) {
       await manageExpenses(e, withdraw);
      if (displayAlert() === false) {
        setOpen(true);
      } else {
        setWarning(true);
      }
    } else {
      setBad(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setBad(false);
    setWarning(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        className={classes.margin}
        name="deposit"
        onClick={e => handleClick(e)}
      >
        Deposit
      </Button>
      <Button
        variant="outlined"
        className={classes.margin}
        name="withdraw"
        onClick={e => handleClick(e, withdraw)}
      >
        Withdraw
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={good}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          message="Tranaction Complete!"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={bad}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="error"
          message="Please Fill Out All Inputs"
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={warning}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="warning"
          message="Balance Can't Go Below 500"
        />
      </Snackbar>
    </div>
  );
}
