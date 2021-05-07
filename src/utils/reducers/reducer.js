// https://medium.com/cleverprogrammer/amazon-clone-using-react-the-ultimate-guide-fba2b36f3458

export const initialState = {
  user: null,
  token: null,
  theme: false,
  alertMessage: null,
  alertType: 'none',
  alertOpen: false,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
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
      // setter
      return {
        ...state,
        token: action.token,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default reducer;
