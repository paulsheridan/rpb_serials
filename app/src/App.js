import React from "react";
import { BrowserRouter, Route, Redirect, Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import themes, { overrides } from './themes';
import Login from './pages/login';
import SerialNumberInput from "./pages/SerialNumberInput";

const theme = createMuiTheme({...themes.default, ...overrides});

// const PrivateRoute = ({ component, ...rest }) => {
//   return (
//     <Route
//       {...rest} render={props => (
//       Cookies.get('accessToken') ? (
//         React.createElement(component, props)
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: props.location },
//           }}
//         />
//       )
//     )}
//     />
//   );
// };

// const PublicRoute = ({ component, ...rest }) => {
//   return (
//     <Route
//       {...rest} render={props => (
//       Cookies.get('accessToken') ? (
//         <Redirect
//           to={{
//             pathname: '/',
//           }}
//         />
//       ) : (
//         React.createElement(component, props)
//       )
//     )}
//     />
//   );
// };

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <ul>
              <li><Link to="/decoder">Serial Number Decoder</Link></li>
            </ul>
          </div>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/decoder" component={SerialNumberInput} />
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default App;
