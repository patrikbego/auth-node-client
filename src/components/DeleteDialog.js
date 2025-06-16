import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Delete, Save } from '@material-ui/icons';
import { useStateValue } from '../utils/reducers/StateProvider';
import { handleDelete } from '../api/posts';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DeleteDialog(itemId) {
  const [open, setOpen] = React.useState(false);
  const [{}, dispatch] = useStateValue();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteButton = () => {
    handleDelete(itemId, dispatch);
    setOpen(false);
  };

  return (
    <div>
      <ListItem
        button
        onClick={handleClickOpen}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The post will be deleted. Are you sure you want to do that?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteButton} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
