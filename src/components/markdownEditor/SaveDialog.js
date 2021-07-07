import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Save } from '@material-ui/icons';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { TextField } from '@material-ui/core';
import { openAlertBar } from '../../utils/alertBarUtils';
import { useStateValue } from '../../utils/reducers/StateProvider';
import { handleAddUpdate } from '../../api/posts';
import {parseTitle} from '../../utils/metaUtils';

const styles = (defTheme) => ({
  root: {
    '& > *': {
      margin: defTheme.spacing(1),
    },
  },
  closeButton: {
    position: 'absolute',
    right: defTheme.spacing(1),
    top: defTheme.spacing(1),
    // color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((defTheme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: defTheme.spacing(0, 1),
    // necessary for content to be below app bar
    ...defTheme.mixins.toolbar,
  },
  paragraphContent: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: defTheme.spacing(1),
      width: defTheme.spacing(100),
      // height: theme.spacing(16),
    },
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((defTheme) => ({
  root: {
    // padding: theme.spacing(2),
    display: 'flex',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((defTheme) => ({
  root: {
    margin: 0,
    padding: defTheme.spacing(1),
  },
}))(MuiDialogActions);

export default function SaveDialog({ content, itemId, originalTags }) {
  console.log('originalTags', originalTags);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tags, setTags] = React.useState(originalTags);

  const [{ alertOpen, alertMessage, alertType }, dispatch] = useStateValue();

  const handleClickOpen = () => {
    const articleTitle = content.split('\n')[0];
    if (articleTitle && !articleTitle.includes('#')) {
      setOpen(false);
      console.log('Title is required');
      openAlertBar(dispatch, 'Title is required!', 'error');
      return;
    }
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    handleAddUpdate(content, setOpen, dispatch, tags, true, itemId);
  };

  const handleSaveDraft = () => {
    handleAddUpdate(content, setOpen, dispatch, tags, false, itemId);
  };

  function handleTags(event) {
    setTags(event.target.value);
  }

  return (
    <div>
      <ListItem
        button
        onClick={handleClickOpen}
      >
        <ListItemIcon>
          <Save />
        </ListItemIcon>
      </ListItem>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}> */}
      {/*  Open dialog */}
      {/* </Button> */}
      <Dialog
        onClose={handleSave}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
          Editor Helper
        </DialogTitle>
        <Divider />
        <div className={classes.paragraphContent}>
          <p>
            This Article can be saved as Draft for you to attend to it later.
            To make it visible online please add the hash tags e.g. #GoodNews
            and click on
            {' '}
            <b>Publish</b>
          </p>
        </div>
        <DialogContent dividers width="100%">
          {/* <main className={styles.mdContent}> */}
          {/* <div className={classes.toolbar} /> */}
          <TextField
            id="outlined-basic"
            label="#Tags"
            onChange={handleTags}
            fullWidth
            defaultValue={tags}
          />
          {/* </main> */}
          {/* <main className={styles.mdContent}> */}
          {/*  /!* <div className={classes.toolbar} /> *!/ */}
          {/*  <Typography */}
          {/*    paragraph */}
          {/*    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedContent) }} */}
          {/*  /> */}
          {/* </main> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button autoFocus onClick={handleSave} className={classes.closeButton}>
            Save and Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
