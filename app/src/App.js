import React from "react";
import { BrowserRouter, Route, Redirect, Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie"

import googleAuth from "./googleAuth";
import Login from './pages/login';
import Decoder from "./pages/SerialNumberInput";

const PrivateRoute = ({ component: Component, ...other }) => (
  <Route {...other} render={(props) => (
     googleAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: "/Login",
        state: { from: props.location }
      }} />
  )} />
)

const Public = () => <h3>Public</h3>

const AuthButton = withRouter(({ history }) => (
   googleAuth.isAuthenticated
    ? <p>
        Welcome! <button onClick={() => {
           googleAuth.signout(() => history.push("/"))
        }}>Sign out</button>
      </p>
    : <p>You are not logged in.</p>
))

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AuthButton />
          <ul>
            <li><Link to="/public">Public Page</Link></li>
            <li><Link to="/decoder">Serial Number Decoder</Link></li>
          </ul>
        </div>
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/decoder" component={Decoder} />
      </BrowserRouter>
    )
  }

}

export default App;
