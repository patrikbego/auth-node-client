import { red } from '@material-ui/core/colors';

export default function muiSetter(reactUseStateValue, reactCreateMuiTheme) {
  const [{ darkOrLiteTheme }] = reactUseStateValue();

  const palletType = darkOrLiteTheme ? 'dark' : 'light';
  const mainPrimaryColor = darkOrLiteTheme ? '#272c34' : '#fff';
  const mainSecondaryColor = darkOrLiteTheme ? '#fff' : '#272c34';
  const darkLightTheme = reactCreateMuiTheme({
    ...darkOrLiteTheme,
    palette: {
      type: palletType,
      // text: {
      //   primary: mainPrimaryColor,
      //   secondary: mainSecondaryColor,
      // },
      primary: {
        main: mainPrimaryColor,
        // contrastText: 'red', //will make button text red
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
  return { darkLightTheme };
}
