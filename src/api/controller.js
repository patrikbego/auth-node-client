import facebookService from '../utils/facebookService';
import googleService from '../utils/googleService';

const controllers = {
  URL: `${process.env.NEXT_PUBLIC_REST_API}/api/v1`,
  url() {
    return controllers.URL;
  },

  signUp(body) {
    return fetch(`${controllers.URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  updateProfile(body) {
    return fetch(`${controllers.URL}/user/updateUser`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async logout(fs, gs) {
    if (fs) {
      try {
        facebookService.logout();
        console.info('logged out from facebook');
      } catch (e) {
        console.error('not logged in with FB', e);
      }
    }
    if (gs) {
      try {
        await googleService.logout();
        console.info('logged out from google');
      } catch (e) {
        console.error('not logged in with google', e);
      }
    }
    try {
      // TODO test this functionality
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();

        document.cookie = 'devst=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    } catch (e) {
      console.log('failed to clear the auth data');
    }
  },

  async loginWithFbReq(options) {
    // login with facebook then authenticate with the API to get a JWT auth token
    return fetch(`${controllers.URL}/auth/fb`, options);
    // get return url from location state or default to home page
    // const {from} = history.location.state || {from: {pathname: "/"}};
    // history.push(from);
  },

  loginWithGooglReq(options) {
    // login with facebook then authenticate with the API to get a JWT auth token
    return fetch(`${controllers.URL}/auth/googl`, options);
    // get return url from location state or default to home page
    // const {from} = history.location.state || {from: {pathname: "/"}};
    // history.push(from);
  },

  signIn(body) {
    const headers = new Headers();
    headers.append('Authorization',
      `Bearer ${btoa(`${body.email}:${body.password}`)}`);
    return fetch(`${controllers.URL}/auth/signin`, {
      method: 'POST',
      credentials: 'include',
      headers,
    });
  },

  confirmEmail(body) {
    return fetch(`${controllers.URL}/auth/confirmEmail`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  createBlog(body) {
    return fetch(`${controllers.URL}/blog/createBlog`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  updateBlog(body) {
    return fetch(`${controllers.URL}/blog/updateBlog`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  deleteBlog(body) {
    return fetch(`${controllers.URL}/blog/deleteBlog`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  getAllBlogs() {
    return fetch(`${controllers.URL}/blog/getAllBlogs`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  getUserDraftBlogs(username, req, token) {
    const headers = new Headers();
    // headers.append('Set-Cookie', `devst=${token}`);
    headers.append('cookie', `devst=${token}`);
    headers.append('Content-Type', 'application/json');
    // headers['Content-Type'] = 'application/json';
    console.debug('getUserDraftBlogs URL => ', `${controllers.URL}/blog/getUserDraftBlogs/${username}`);
    return fetch(`${controllers.URL}/blog/getUserDraftBlogs/${username}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      headers,
    });
  },

  getUserBlogs(username) {
    return fetch(`${controllers.URL}/blog/getUserBlogs/${username}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async getBlog(id) {
    let data;
    try {
      const res = await fetch(`${controllers.URL}/blog/getBlog/${id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) return { error: 'Please Login!' };
      data = await res.json();
    } catch (e) {
      console.error(e);
    }
    return data;
  },

  async getUser(body) {
    const res = await fetch(`${controllers.URL}/user/getUser`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const user = await res.json();
    return user;
  },

  makePayment(body) {
    return fetch(`${controllers.URL}/makePayment`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default controllers;
