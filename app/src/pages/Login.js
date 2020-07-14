import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Card, Form } from '../themes/authForms';
import { GoogleLogin } from 'react-google-login';
import { useAuth } from '../context/auth';

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();
  const referer = props.location.state.referer || "/";

  function postLogin(userInfo) {
    axios.post("http://localhost:5000/graphql", {
      query: `
      mutation {
        tokenAuth(idToken: ${JSON.stringify(userInfo.tokenId)}) {
          token {
            accessToken
            refreshToken
          }
        }
      }
      `
    }).then(response => {
      if (response.status === 200) {
        setAuthTokens(response.data.data.tokenAuth.token.accessToken);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <Card>
      <Form>
      <GoogleLogin
        clientId="161417844290-ueic5i3perjmooskhmoea4mk9a542mm1.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={postLogin}
      />
      </Form>
    </Card>
  );
}

export default Login;
