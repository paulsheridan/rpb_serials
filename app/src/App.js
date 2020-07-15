import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import PrivateRoute from './PrivateRoute';
import SerialDecoder from './pages/SerialDecoder';
import ModelAdmin from './pages/ModelAdmin';
import { AuthContext } from './context/auth';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Divider from "@material-ui/core/Divider";


function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    Cookies.set("accessToken", data);
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <NavBar />
        <Divider />
        <div>
          <Route exact path="/" render={() => <Redirect to="/decoder" />} />
          <Route path="/login" render={(props) => <Login {...props} />} />
          <PrivateRoute path="/decoder" component={SerialDecoder} />
          <PrivateRoute path="/addmodels" component={ModelAdmin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
