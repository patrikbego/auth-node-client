// https://medium.com/cleverprogrammer/amazon-clone-using-react-the-ultimate-guide-fba2b36f3458

export const initialState = {
  user: null,
  token: null,
  theme: false,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
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
