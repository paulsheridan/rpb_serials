import { compose, withState, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginView from "./LoginView";
import { loginUser, resetError } from "./LoginState";

export default compose(
  connect(
    state => ({
      isLoading: state.login.isLoading,
      isAuthenticated: state.login.isAuthenticated,
      error: state.login.error
    }),
    { loginUser, resetError }
  ),
  withRouter,
  withState("activeTabId", "setActiveTabId", 0),
  withHandlers({
    handleTabChange: props => (e, id) => {
      props.setActiveTabId(id);
    },
    handleGoogleLogin: props => (userInfo) => {
      props.loginUser(userInfo);
    }
  })
)(LoginView);
