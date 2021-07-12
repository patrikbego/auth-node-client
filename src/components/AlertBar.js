import React, { useRef } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((defTheme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: defTheme.spacing(2),
    },
  },
}));

export default function AlertBar({ alertOpen, alertMessage, alertType }) {
  const sb = useRef();
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    console.debug('clicked', alertOpen, reason);
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        ref={sb}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
