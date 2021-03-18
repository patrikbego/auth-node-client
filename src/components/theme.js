import { createMuiTheme } from '@material-ui/core/styles';
import {
  deepOrange,
  deepPurple,
  lightBlue,
  orange,
  red,
} from '@material-ui/core/colors';

let theme;
const palletType = theme ? 'dark' : 'light';
const mainPrimaryColor = theme ? orange[500] : lightBlue[500];
const mainSecondaryColor = theme ? deepOrange[900] : deepPurple[500];
const darkLightTheme = createMuiTheme({
  type: palletType,
  palette: {
    primary: {
      main: mainPrimaryColor,
    },
    secondary: {
      main: mainSecondaryColor,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: theme ? 'grey' : '#fff',
    },
  },
});

export default darkLightTheme;
