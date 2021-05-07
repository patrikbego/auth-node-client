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
import controllers from '../../api/controller';
import { openAlertBar } from '../../utils/alertBarUtils';
import { useStateValue } from '../../utils/reducers/StateProvider';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    // color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  paragraphContent: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(100),
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

const DialogContent = withStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    display: 'flex',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SaveDialog({ content }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tags, setTags] = React.useState(false);

  const [{ alertOpen, alertMessage, alertType }, dispatch] = useStateValue();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSave = (publish) => {
    if (!content) {
      setOpen(false);
      console.log('content is required');
      openAlertBar(dispatch, 'Content is required!', 'error');
      return;
    }
    const articleTitle = content.split('\n')[0];
    if (articleTitle && !articleTitle.includes('#')) {
      setOpen(false);
      console.log('Title is required');
      openAlertBar(dispatch, 'Title is required!', 'error');
      return;
    }
    const blog = {
      // userId: , parsed from cookie on the server
      language: 'EN',
      original: 'EN',
      title: articleTitle,
      body: content,
      tags,
      published: !!publish,
      status: publish ? 'PUBLISHED' : 'DRAFT',
      created_date: new Date(),
      // updated_date: new Date(),
    };

    controllers.createBlog({ blog, tags })
      .then((res) => {
        setOpen(false);
        if (res.status !== 200) { // TODO extract that and add info level for 200 or 300 codes
          openAlertBar(dispatch, res.statusText, 'error');
        } else {
          openAlertBar(dispatch, 'Article has been created!', 'success');
        }
      });
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
        <DialogTitle id="customized-dialog-title" onClose={handleSave}>
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
          />
          {/* </main> */}
          {/* <main className={styles.mdContent}> */}
          {/*  /!* <div className={classes.toolbar} /> *!/ */}
          {/*  <Typography */}
          {/*    paragraph */}
          {/*    dangerouslySetInnerHTML={{ __html: parsedContent }} */}
          {/*  /> */}
          {/* </main> */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave}>
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
