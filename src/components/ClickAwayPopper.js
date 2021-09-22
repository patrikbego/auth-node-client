import React from 'react';
import {
  ClickAwayListener,
  Fade,
  makeStyles,
  Paper,
  Popper,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ShareFooter from './ShareFooter';

export default function ClickAwayPopper({
  open, clickAwayHandler, clickHandler, anchorEl, placement,
  postData = { title: 'octoplasm.com', image: '' },
  shareUrl = 'https://octoplasm.com',
}) {
  const useStyles = makeStyles((defTheme) => ({
    root: {
      width: '80%',
      paddingTop: '10vh',
    },
    typography: {
      padding: defTheme.spacing(2),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Popper
        className={classes.root}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        onClick={clickHandler}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <ClickAwayListener onClickAway={clickAwayHandler}>
            <div>
              <Paper className={classes.typography}>
                {/* <Typography className={classes.typography}> */}
                <ShareFooter postData={postData} shareUrl={shareUrl} />
                {/* </Typography> */}
              </Paper>
            </div>
            </ClickAwayListener>
          </Fade>
        )}
      </Popper>
    </>
  );
}
