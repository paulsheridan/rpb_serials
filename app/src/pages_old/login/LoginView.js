import React from "react";
import {
  Grid,
  Typography,
  withStyles,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import classnames from "classnames";
import GoogleLogin from 'react-google-login';

import google from "../../images/google.svg";

const Login = ({ classes, ...props }) => (
  <Grid container className={classes.container}>
    <div className={classes.formContainer}>
      <div className={classes.form}>
        <Tabs
          value={props.activeTabId}
          onChange={props.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Login" classes={{ root: classes.tab }} />
          <Tab label="Get Access" classes={{ root: classes.tab }} />
        </Tabs>
        {props.activeTabId === 0 && (
          <React.Fragment>
            <Typography variant="h3" className={classes.greeting}>
              Login
            </Typography>
            <div className={classes.formDividerContainer}>
              <div className={classes.formDivider} />
              <Typography className={classes.formDividerWord}></Typography>
              <div className={classes.formDivider} />
            </div>
            <GoogleLogin
              render={renderProps => (
                <Button size="large" className={classes.googleButton} onClick={renderProps.onClick}>
                  <img src={google} alt="google" className={classes.googleIcon}/>
                  &nbsp;Sign in with Google
                </Button>
              )}
              clientId='161417844290-ueic5i3perjmooskhmoea4mk9a542mm1.apps.googleusercontent.com'
              buttonText='Sign in with Google'
              onSuccess={props.handleGoogleLogin}
            />
          </React.Fragment>
        )}
        {props.activeTabId === 1 && (
          <React.Fragment>
            <Typography variant="h3" className={classes.greeting}>
              Get Access
            </Typography>
            <div className={classes.formDividerContainer}>
              <div className={classes.formDivider} />
              <Typography className={classes.formDividerWord}></Typography>
              <div className={classes.formDivider} />
            </div>
            <Button
              size="large"
              className={classnames(
                classes.googleButton,
                classes.googleButtonCreating
              )}
            >
              <img src={google} alt="google" className={classes.googleIcon} />
              &nbsp;Sign in with Google
            </Button>
          </React.Fragment>
        )}
      </div>
      <Typography color="primary" className={classes.copyright}>
        © Copyright Info.
      </Typography>
    </div>
  </Grid>
);

const styles = theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%"
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing(4)
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48
    }
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%"
    }
  },
  form: {
    width: 320
  },
  tab: {
    fontWeight: 400,
    fontSize: 18
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4)
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2)
  },
  googleButton: {
    marginTop: theme.spacing(6),
    backgroundColor: "white",
    width: "100%",
    textTransform: "none"
  },
  googleButtonCreating: {
    marginTop: 0
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2)
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  createAccountButton: {
    height: 46,
    textTransform: "none"
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center"
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40"
  },
  errorMessage: {
    textAlign: "center"
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`
    }
  },
  textField: {
    borderBottomColor: theme.palette.background.light
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400
  },
  loginLoader: {
    marginLeft: theme.spacing(4)
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: 'nowrap',
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    }
  }
});

export default withStyles(styles, { withTheme: true })(Login);
