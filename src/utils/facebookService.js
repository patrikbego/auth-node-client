// const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

import controllers from '../api/controller';

const facebookAppId = 545112093272562;

const facebookService = {
  user: null,
  processAuthResponse(authResponse) {
    if (!authResponse) return null;

    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: authResponse.accessToken }, null, 2)],
      { type: 'application/json' },
    );
    return {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    };
  },
  initFacebookSdk() {
    return new Promise((resolve) => {
      // wait for facebook sdk to initialize before starting the react app
      if (typeof window !== 'undefined') {
        if (window.FB) {
          resolve(window.FB);
        }
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: facebookAppId,
            cookie: true,
            xfbml: true,
            version: 'v8.0',
          });

          // auto authenticate with the api if already logged in with facebook
          window.FB.getLoginStatus(async ({ authResponse }) => {
            const options = facebookService.processAuthResponse(authResponse);
            if (options) {
              const r = await controllers.loginWithFbReq(options);
            }
          });
        };

        // load facebook sdk script
        (function (d, s, id) {
          let js;
          const fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      }
      resolve(null);
    });
  },

  logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
    // facebookService.stopAuthenticateTimer();
    // facebookService.accountSubject.next(null);
    // history.push('/login');
  },

  // helper methods
  async loginWithFb() {
    return new Promise((resolve) => {
      let user = null;
      window.FB.getLoginStatus(async ({ authResponse }) => {
        const options = facebookService.processAuthResponse(authResponse);
        if (options) {
          const r = await controllers.loginWithFbReq(options);
          if (r.code === 200) {
            console.debug('all ok no need to procced');
            console.debug(r.json());
            user = r.json();
          }
          console.error('not ok ', authResponse, r);
          window.FB.login(async (authResponse1) => { // TODO handle errors
            // handle the response
            // const { authResponse } = await new Promise(window.FB.login);
            const options1 = facebookService.processAuthResponse(
              authResponse1,
            );
            if (options1) {
              const r1 = await controllers.loginWithFbReq(options1);
              // const token = r.headers.get('Authorization');
              user = r1.json();
            }
          }, { scope: 'public_profile,email', return_scopes: true });
        }
      });
      resolve(user);
    });
    // get return url from location state or default to home page
    // const {from} = history.location.state || {from: {pathname: "/"}};
    // history.push(from);
  },

  authenticateTimeout: null,

  startAuthenticateTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(
      atob(facebookService.user.value.token.split('.')[1]),
    );

    // set a timeout to re-authenticate with the api one minute before the token expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    const { accessToken } = window.FB.getAuthResponse();
    facebookService.authenticateTimeout = setTimeout(
      () => facebookService.loginWithFb(accessToken), timeout,
    );
  },

  stopAuthenticateTimer() {
    // cancel timer for re-authenticating with the api
    clearTimeout(facebookService.authenticateTimeout);
  },

  getLoginStatus() {
    return new Promise(async (resolve) => {
      const FB = await facebookService.getScript();

      FB.getLoginStatus((response) => {
        resolve(response);
      });
    });
  },

  login(params = { scope: 'public_profile,email' }) {
    return new Promise(async (resolve) => {
      const FB = await facebookService.initFacebookSdk();

      FB.login(async (response) => {
        let user;
        console.debug('login response', response);
        const options = facebookService.processAuthResponse(response.authResponse);
        console.debug('login options', options);
        if (options) {
          const r1 = await controllers.loginWithFbReq(options);
          // const token = r.headers.get('Authorization');
          user = await r1.json();
        }
        console.debug(user);
        resolve(user);
      }, params);
    });
  },

  logout1() {
    return new Promise(async (resolve) => {
      const FB = await facebookService.initFacebookSdk();

      FB.logout((response) => {
        resolve(response);
      });
    });
  },

  getAuthResponse() {
    return new Promise(async (resolve) => {
      const FB = await facebookService.initFacebookSdk();

      resolve(FB.getAuthResponse());
    });
  },

  me() {
    return new Promise(async (resolve) => {
      const me = await facebookService.api('/me?fields=name,email,gender,verified,link');

      resolve(me);
    });
  },
};

module.exports = facebookService;
