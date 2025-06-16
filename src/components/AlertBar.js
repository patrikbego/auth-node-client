import React, { useRef, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function FilledAlert(props) {
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

const useHandleClose = (initialState) => {
  const [open, setOpen] = useState(initialState);
  const handleClose = (event, reason) => {
    console.debug('clicked', initialState, reason);
    if (reason !== 'clickaway') {
      setOpen(false);
    }
  };
  return [open, handleClose];
};

const AUTO_HIDE_DURATION = 6000;

export default function AlertSnackbar({ alertOpen, alertMessage, alertType }) {
  const snackbarRef = useRef();
  const classes = useStyles();
  const [open, handleClose] = useHandleClose(alertOpen);

  return (
    <div className={classes.root}>
      <Snackbar
        ref={snackbarRef}
        open={open}
        autoHideDuration={AUTO_HIDE_DURATION}
        onClose={handleClose}
      >
        <FilledAlert onClose={handleClose} severity={alertType}>
          {alertMessage}
        </FilledAlert>
      </Snackbar>
    </div>
  );
}
