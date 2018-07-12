import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
const clientSecret = 'lgprCAptp5kWZf9aObbei1xQ';

class Authentication extends Component {

  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: '' };
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
  };

  googleResponse = async (response) => {

    const res = await fetch(`http://localhost:3000/authuser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth-token': `${response.tokenId}`
      }
    });
    const data = await res.json();
    console.log('this is data in authentication.jsx',data);
    this.props.history.push(`/test/${data.sub}`);
    // const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.tokenId}`);
    // const data = await res.json();
    // console.log(data);

    // const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)],
    //   { type: 'application/json' });
    // const options = {
    //   method: 'POST',
    //   body: tokenBlob,
    //   mode: 'cors',
    //   cache: 'default'
    // };

    // fetch('http://localhost:3000/api/v1/auth/google', options)
    //   .then(r => {
    //     const token = r.headers.get('x-auth-token');
    //     console.log('token', token);
    //     r.json().then(user => {
    //       if (token) {
    //         this.setState({ isAuthenticated: true, user, token })
    //       }
    //     });
    //   })
  };

  onFailure = (error) => {
    alert(error);
  }

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button">
              Log out
                        </button>
          </div>
        </div>
      ) :
      (
        <div>
          <GoogleLogin
            clientId="1035150499504-g7adn54bn3tda9fqh3rsbb4m8j8if837.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default Authentication;