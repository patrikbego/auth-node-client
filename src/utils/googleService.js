import controllers from '../api/controller';

const googleAppId = '834417214001-8ftp5ufhf1rrmhe8khil3p8bgo4vg3hk.apps.googleusercontent.com';

const googleService = {
  user: null,
  googleAuth: null,
  processAuthResponse(authResponse) {
    if (!authResponse) return null;

    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: authResponse }, null, 2)],
      { type: 'application/json' },
    );
    console.log('access_token', authResponse);
    const headers = new Headers();
    headers.append('Authorization',
      `Bearer ${btoa(`: ${authResponse}`)}`);
    headers.append('access_token', authResponse);
    return {
      method: 'POST',
      body: tokenBlob,
      headers,
      mode: 'cors',
      cache: 'default',
    };
  },
  getScript() {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined') {
        if (window.gapi) {
          resolve(window.gapi);
        }

        const id = 'google-jssdk';
        const fjs = document.querySelectorAll('script')[0];
        if (document.getElementById(id)) {
          return;
        }

        const js = document.createElement('script');
        js.id = id;
        js.src = 'https://apis.google.com/js/platform.js?onload=init';

        js.addEventListener('load', () => {
          Object.assign(googleService, {
            AppEvents: window.gapi.AppEvents,
            Canvas: window.gapi.Canvas,
            Event: window.gapi.Event,
            Frictionless: window.gapi.Frictionless,
            XFBML: window.gapi.XFBML,
          });

          // console.log(this);

          resolve(window.gapi);
        });

        fjs.parentNode.insertBefore(js, fjs);
      }
    });
  },
  init(params = {}) {
    return new Promise(async (resolve) => {
      const gapi = await this.getScript();
      if (googleService.googleAuth) resolve(googleService.googleAuth);
      gapi.load('auth2', () => {
        /* Ready. Make a call to gapi.auth2.init or some other API */
        console.debug('before google api call');
        googleService.googleAuth = window.gapi.auth2.init({
          client_id: googleAppId,
          scope: 'email profile openid',
        });
        console.debug('after google api call', googleService.googleAuth);
        resolve(googleService.googleAuth);
      });
    });
  },
  logout() {
    return new Promise(async (resolve) => {
      const gapi = await googleService.init();

      // const auth2 = gapi.getAuthInstance();
      gapi.signOut().then(() => {
        console.log('Gooser signed out.');
        gapi.disconnect();
        resolve('Gooser signed out.');
      });
    });
  },

  login(params = { scope: 'email profile' }) {
    return new Promise(async (resolve) => {
      const gapi = await googleService.init();

      console.debug('gapi.isSignedIn.get()', gapi.isSignedIn.get());
      console.debug('currentUser.get()', gapi.currentUser.get());
      console.debug('currentUser.get()', gapi.currentUser.get().getGrantedScopes());

      gapi.signIn({
        // client_id: googleAppId,
        scope: 'email profile openid',
        // response_type: 'id_token permission',
      }).then(async (response) => { // TODO handle errors
        // gapi.grantOfflineAccess().then(async (response) => {
        if (response.error) {
          // An error happened!
          console.error(response.error);
          return;
        }

        let user;
        console.debug('login response', response);
        const options = googleService.processAuthResponse(
          response && response.accessToken
            ? response.accessToken
            : response.getAuthResponse().access_token,
        );
        console.log('login options', options);
        if (options) {
          const r1 = await controllers.loginWithGooglReq(options);
          // const token = r.headers.get('Authorization');
          user = await r1.json();
        }
        console.debug(user);
        resolve(user);

        // You can also now use gapi.client to perform authenticated requests.
      }, params);
    });
  },

  async loginWithG(params = { scope: 'email profile openid' }) {
    const gapi = await googleService.init();

    console.debug('gapi.isSignedIn.get()', gapi.isSignedIn.get());
    console.debug('currentUser.get()', gapi.currentUser.get());
    console.debug('currentUser.get()',
      gapi.currentUser.get().getGrantedScopes());
    return gapi.signIn({
      // client_id: googleAppId,
      scope: params.scope,
      // response_type: 'id_token permission',
    });
  },

  // helper methods
  async loginWithGoogl() {
    // login with google then authenticate with the API to get a JWT auth token
    // const { authResponse } = await new Promise(window.gapi.auth2.authorize);
    // if (!authResponse) return null;
    let res = null;
    let googleAuth = null;
    window.gapi.load('auth2', () => {
      /* Ready. Make a call to gapi.auth2.init or some other API */
      console.debug('before google api call');
      googleAuth = window.gapi.auth2.init({
        client_id: googleAppId,
        // scope: 'profile email',
      });
      console.debug('after google api call');
      const auth2 = window.gapi.auth2.getAuthInstance();
      // if (auth2) {
      //   console.log(auth2);
      //   await controllers.signIn(auth2);
      // }

      googleAuth.signIn({
        // client_id: googleAppId,
        scope: 'profile email',
        // response_type: 'id_token permission',
      }, async (response) => {
        if (response.error) {
          // An error happened!
          console.error('response.error', response.error);
          return;
        }
        // The user authorized the application for the scopes requested.
        const accessToken = response.access_token;
        const idToken = response.id_token;
        // You can also now use gapi.client to perform authenticated requests.

        const tokenBlob = new Blob(
          [JSON.stringify({ access_token: accessToken }, null, 2)],
          { type: 'application/json' },
        );
        const options = {
          method: 'POST',
          body: tokenBlob,
          mode: 'cors',
          cache: 'default',
        };
        const r = await controllers.loginWithGooglReq(options);
        // const token = r.headers.get('Authorization');
        res = await r.json();
      });
    });
    return res;
    // get return url from location state or default to home page
    // const {from} = history.location.state || {from: {pathname: "/"}};
    // history.push(from);
  },
};

module.exports = googleService;
