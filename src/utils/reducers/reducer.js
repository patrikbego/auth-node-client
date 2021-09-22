// https://medium.com/cleverprogrammer/amazon-clone-using-react-the-ultimate-guide-fba2b36f3458

export const initialState = {
  user: null,
  token: null,
  darkOrLiteTheme: false,
  alertMessage: null,
  alertType: 'none',
  alertOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      if (action && action.user) sessionStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
      };
    case 'SET_ALERT_MESSAGE':
      return {
        ...state,
        alertMessage: action.alertMessage,
      };
    case 'SET_ALERT_TYPE':
      return {
        ...state,
        alertType: action.alertType,
      };
    case 'SET_ALERT_OPEN':
      return {
        ...state,
        alertOpen: action.alertOpen,
      };
    case 'SET_TOKEN':
      if (action && action.token) sessionStorage.setItem('token', JSON.stringify(action.token));
      return {
        ...state,
        token: action.token,
      };
    case 'SET_THEME':
      if (action && action.darkOrLiteTheme) sessionStorage.setItem('darkOrLiteTheme', JSON.stringify(action.darkOrLiteTheme));
      return {
        ...state,
        darkOrLiteTheme: action.darkOrLiteTheme,
      };
    default:
      return state;
  }
};

export default reducer;
