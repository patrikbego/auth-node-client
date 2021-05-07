import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { useStateValue } from './reducers/StateProvider';

// const [{ theme }] = useStateValue();
let theme;
const palletType = theme ? 'dark' : 'light';
const mainPrimaryColor = theme ? '#272c34' : '#fff';
const mainSecondaryColor = theme ? '#fff' : '#272c34';
const darkLightTheme = createMuiTheme({
  ...theme,
  palette: {
    type: palletType,
    // text: {
    //   primary: mainPrimaryColor,
    //   secondary: mainSecondaryColor,
    // },
    primary: {
      main: mainPrimaryColor,
      // contrastText: 'red', //makes button text red
    },
    secondary: {
      main: mainSecondaryColor,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: mainPrimaryColor,
    },
  },
  typography: {
    fontFamily: ['"Libre Barcode 39 Text"', 'Roboto'].join(','),
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        '@media (max-width:600px)': {
          // fontSize: '1.0rem',
          fontSize: '1.0rem',
        },
        '@media (min-width:600px)': {
          // fontSize: '0.5rem',
          fontSize: '1.5rem',
        },
        color: mainSecondaryColor,
      },
    },
    // MuiAppBar: {
    //   root: {
    //     color: 'red',
    //     backgroundColor: 'red',
    //     background: {
    //       color: 'red',
    //       default: theme ? '#303030' : '#fff',
    //     },
    //   },
    // },
  },
});
export default darkLightTheme;
