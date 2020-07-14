import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import SerialDecoder from "./pages/SerialDecoder";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    Cookies.set("accessToken", data);
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
        <ul>
          <li>
            <Link to="/decoder">Serial Decoder</Link>
          </li>
        </ul>
          <Route exact path="/" render={() => <Redirect to="/decoder" />} />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/decoder" component={SerialDecoder} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
