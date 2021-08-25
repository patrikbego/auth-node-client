import controller from '../api/controller';

export function parseJwt(jwt) {
  if (!jwt) return { user: null };
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64)
    .split('')
    .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
    .join(''));
  const pjwt = JSON.parse(jsonPayload);
  console.log('pjwt', pjwt);
  return pjwt;
}

export function clearGlobalState(token, dispatch) {
  if (token) {
    dispatch({
      type: 'SET_USER',
      user: null,
    });
    dispatch({
      type: 'SET_TOKEN',
      token: null,
    });
  }
}

export function validateJwt(jwt, dispatch) {
  const pjwt = parseJwt(jwt);
  if (pjwt && (pjwt.exp * 1000) < Date.now()) {
    controller.logout().then(() => console.log('Token expired'));
    if (dispatch) clearGlobalState(jwt, dispatch);
  } else {
    console.log('Token check');
  }
  return jwt;
}

export function tokenSetter(token, dispatch, reactUseEffect) {
  reactUseEffect(() => {
    const timer = setInterval(() => {
      validateJwt(token, dispatch);
    }, 1000);
    // clearing interval
    return () => clearInterval(timer);
  });
}

export function extractTokenFromHeaders(headers) {
  let token;
  if (headers && headers.cookie) {
    headers.cookie.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      console.log(
        `cookie: ${parts[0]}=${parts[1]}`,
      );
      if (parts[0].trim() === '__st' || parts[0].trim() === 'devst') {
        token = parts.length === 2 ? parts[1] : undefined;
      }
    });
  }
  return token;
}
