// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import Cookies from 'js-cookie'

// import googleAuth from '../googleAuth';

// class Login extends React.Component {
//   state = {
//     redirectToReferrer: false
//   }
//   login = () => {
//       googleAuth.authenticate(() => {
//       this.setState(() => ({
//         redirectToReferrer: true
//       }))
//     })
//   }
//   render() {
//     const { from } = this.props.location.state || { from: { pathname: '/' } }
//     const { redirectToReferrer } = this.state

//     if (redirectToReferrer === true) {
//       return <Redirect to={from} />
//     }

//     return (
//       <div>
//         <p>You must log in to view the page</p>
//         <button onClick={this.login}>Log in</button>
//         <GoogleLogin
//           clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
//           buttonText="Login"
//           onSuccess={responseGoogle}
//           cookiePolicy={'single_host_origin'}
//         />,
//       </div>
//     )
//   }
// }

// export default Login