import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  Fade, makeStyles, Paper, Popper, Tooltip,
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  Add, Create, MenuBook, Search, Share,
} from '@material-ui/icons';
import React from 'react';
import * as PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import DeleteDialog from './DeleteDialog';
import ShareFooter from './ShareFooter';
import {useStateValue} from '../utils/reducers/StateProvider';

export default function MainLayoutDrawer(props) {
  const router = useRouter();
  console.log('MainLayoutDrawer', props);

  async function addArticle() {
    // TODO check if logged in
    await router.push('/blog/0');
  }

  async function editArticle() {
    // TODO check if logged in
    console.log(`/blog/${props.itemId}`);
    await router.push(`/blog/${props.itemId}`);
  }

  async function deleteArticle() {
    // TODO check if logged in
    // await router.push('/blog/0');
    // popup "are you sure you want to delete it"
    // delete

  }

  const useStyles = makeStyles((defTheme) => ({
    root: {
      width: '80%',
    },
    typography: {
      padding: defTheme.spacing(2),
    },
  }));
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [{ user, token }, dispatch] = useStateValue();

  const handleSearchClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleDraftClick = (newPlacement) => async (event) => {
    console.log(`/drafts/${user.userName}`);
    await router.push(`/drafts/${user.userName}`);
  };

  return (
    <>
      <Popper
        className={classes.root}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>
                <ShareFooter postData="octoplasm.com" shareUrl="https://octoplasm.com" />
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Drawer
        variant="permanent"
        className={clsx(props.classes.drawer, {
          [props.classes.drawerOpen]: props.open,
          [props.classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [props.classes.drawerOpen]: props.open,
            [props.classes.drawerClose]: !props.open,
          }),
        }}
      >
        <div className={props.classes.toolbar}>
          <IconButton onClick={props.onClick}>
            {props.theme.direction === 'rtl'
              ? <ChevronRightIcon />
              : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <List>
          {/*  Button bar */}
          {props.mainPage ? (
            <>
              <ListItem
                button
                onClick={addArticle}
              >
                <Tooltip title="Create New Article" placement="right">
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                </Tooltip>
              </ListItem>
              {token && user ? (
                  <ListItem
                      button
                      onClick={handleDraftClick()}
                  >
                    <Tooltip title="Get all drafts" placement="right">
                      <ListItemIcon>
                        <MenuBook />
                      </ListItemIcon>
                    </Tooltip>
                  </ListItem>
              ) : (<></>)}
              <ListItem
                button
                onClick={handleSearchClick('right')}
              >
                <Tooltip title="Search posts" placement="right">
                  <ListItemIcon>
                    <Search />
                  </ListItemIcon>
                </Tooltip>
              </ListItem>
              <ListItem
                button
                onClick={handleSearchClick('right')}
              >
                <Tooltip title="Search posts" placement="right">
                  <ListItemIcon>
                    <Share />
                  </ListItemIcon>
                </Tooltip>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                onClick={editArticle}
              >
                <Tooltip title="Edit Article" placement="right">
                  <ListItemIcon>
                    <Create />
                  </ListItemIcon>
                </Tooltip>
              </ListItem>
              <DeleteDialog itemId={props.itemId} />
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

MainLayoutDrawer.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  theme: PropTypes.object,
  mainPage: PropTypes.bool,
  itemId: PropTypes.number,
};
