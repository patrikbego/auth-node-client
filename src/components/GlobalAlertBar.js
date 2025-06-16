import React, { useRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../utils/reducers/StateProvider';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((defTheme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: defTheme.spacing(2),
    },
  }
}));

export default function GlobalAlertBar() {
  const sb = useRef();
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const [{ alertOpen, alertMessage, alertType }, dispatch] = useStateValue();
  // if (alertOpen) setOpen(true);

  const handleClose = (event, reason) => {
    console.debug('handleClose clicked', alertOpen, reason);
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: 'SET_ALERT_OPEN',
      alertOpen: false,
    });
  };

  // const [state, setState] = React.useState({
  //   open: alertOpen,
  //   Transition: 'Fade',
  // });
  //
  // const handleClose = (event) => {
  //   // setState({
  //   //   ...state,
  //   //   open: false,
  //   // });
  //   console.log('alertOpen close', alertOpen, sb);
  //   alertOpen = false;
  // };
  //
  // const handleOpen = () => {
  //   console.log('alertOpen open', alertOpen);
  //   return alertOpen;
  // };

  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={handleClick}> */}
      {/*  Open success snackbar */}
      {/* </Button> */}
      <Snackbar
        ref={sb}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert> */}
      {/* <Alert severity="warning">This is a warning message!</Alert> */}
      {/* <Alert severity="info">This is an information message!</Alert> */}
      {/* <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}
