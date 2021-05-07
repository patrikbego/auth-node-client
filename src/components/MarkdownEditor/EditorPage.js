import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import {
  TextField, Tooltip,
} from '@material-ui/core';
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatSize,
  Photo,
} from '@material-ui/icons';
import Header from '../Header';
import HelpDialog from './HelpDialog';
import mdToHtml from '../../utils/mdUtils';
import SaveDialog from './SavePanel';
import AlertBar from '../AlertBar';
import {useStateValue} from '../../utils/reducers/StateProvider';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
    background: `${theme.palette.primary.main}`,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '50%',
  },
  listButton: {
    marginLeft: 1,
  },
  iconText: {
    display: 'flex',
    textDecoration: 'none',
    flexDirection: 'column',
    // marginTop: theme.spacing(1),
    // color: `${theme.palette.text.secondary}CC`,
    // transition: theme.transitions.create(['opacity', 'color']),
    // fontSize: 0.5,
    // display: 'flex',
    // justifyContent: 'flex-end',
  },
}));

export default function EditorPage({ content }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const mdAction = {
    bold: 'bold',
    italic: 'italic',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    image: 'image',
    code: 'code',
    listNumbered: 'listNumbered',
  };

  // markdown part

  const textareaRef = useRef();
  const [parsedContent, setParsedContent] = React.useState();
  const [mdContent, setMdContent] = React.useState(content);
  const [selStart, setSelStart] = React.useState(0);
  const [selEnd, setSelEnd] = React.useState(0);
  const [selValue, setSelValue] = React.useState('');

  const saveCursorPosition = (e) => {
    const { selectionStart, selectionEnd, value } = e.target;
    console.log(selectionStart, selectionEnd, value);
    setSelStart(selectionStart);
    setSelEnd(selectionEnd);
    setSelValue(value.substring(selectionStart, selectionEnd));
  };

  useEffect(() => {
    console.log('mdContent updated', mdContent);
    mdToHtml(mdContent).then((e) => {
      e = `${'<style>\n'
      + '  h1 {color:red;}\n'
      + '  p {color:blue;}\n'
      + '  img {width:50%;}\n'
      + '</style>'}${
        e}`;
      setParsedContent(e);
    });
  }, [
    mdContent,
  ]);

  const handleChange = async (event) => {
    setMdContent(event.target.value);
    const contentHtml = await mdToHtml(mdContent);
    setParsedContent(contentHtml);
  };

  const handleSave = async (event) => {
    // setMdContent(event.target.value);
    // const contentHtml = await mdToHtml(mdContent);
    // setParsedContent(contentHtml);
  };

  const addMdElement = async (e) => {
    console.log(e);

    switch (e) {
      case mdAction.bold:
        setMdContent([
          mdContent.slice(0, selStart),
          `**${selValue ? selValue : 'Text'}**`,
          mdContent.slice(selEnd)].join(''));
        break;
      case mdAction.italic:
        setMdContent([
          mdContent.slice(0, selStart),
          `*${selValue ? selValue : 'Text'}*`,
          mdContent.slice(selEnd)].join(''));
        break;
      case mdAction.h1:
        setMdContent([
          mdContent.slice(0, selStart),
          `# ${selValue ? selValue : 'Text'}`,
          mdContent.slice(selEnd)].join(''));
        break;
      case mdAction.h2:
        setMdContent([
          mdContent.slice(0, selStart),
          `## ${selValue ? selValue : 'Text'}`,
          mdContent.slice(selEnd)].join(''));
        break;
      case mdAction.h3:
        setMdContent([
          mdContent.slice(0, selStart),
          `### ${selValue ? selValue : 'Text'}`,
          mdContent.slice(selEnd)].join(''));
        break;
      case mdAction.listNumbered:
        setMdContent([
          mdContent.slice(0, selStart),
          `1. ${selValue ? selValue : 'Text'}`,
          mdContent.slice(selEnd)].join(''));
        break;
      case mdAction.code:
        setMdContent([
          mdContent.slice(0, selStart),
          `\`\`\`${selValue ? selValue : 'Text'}\`\`\``,
          mdContent.slice(selEnd)].join(''));
        break;
      case mdAction.image:
        setMdContent([
          mdContent.slice(0, selStart),
          `![alt text](${selValue ? selValue : 'Text'})`,
          mdContent.slice(selEnd)].join(''));
        break;
      default:
        console.log('Md action not found!');
    }
    const contentHtml = await mdToHtml(mdContent);
    setParsedContent(contentHtml);
  };
  // markdown part end
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Header loading={false} />
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl'
                ? <ChevronRightIcon />
                : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <Divider />
          <List>
            {/*  Button bar */}
            <ListItem
              button
              onClick={() => {
                addMdElement(mdAction.bold);
              }}
            >
              <Tooltip title="Add Bold Text" placement="right">
                <ListItemIcon>
                  <FormatBold />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                addMdElement(mdAction.italic);
              }}
            >
              <Tooltip title="Add Italic Text" placement="right">
                <ListItemIcon>
                  <FormatItalic />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                addMdElement(mdAction.h1);
              }}
            >
              {/* TODO make all list items as components */}
              <Tooltip title="Add Large Title" placement="right">
                <ListItemIcon>
                  <FormatSize fontSize="small" />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                addMdElement(mdAction.h2);
              }}
            >
              <Tooltip title="Add Normal Title" placement="right">
                <ListItemIcon>
                  <FormatSize fontSize="default" />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                addMdElement(mdAction.h3);
              }}
            >
              <Tooltip title="Add Small Title" placement="right">
                <ListItemIcon>
                  <FormatSize fontSize="inherit" />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                addMdElement(mdAction.image);
              }}
            >
              <Tooltip title="Add Photo" placement="right">
                <ListItemIcon>
                  <Photo />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                addMdElement(mdAction.listNumbered);
              }}
            >
              <Tooltip title="Add List" placement="right">
                <ListItemIcon>
                  <FormatListNumberedIcon />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                addMdElement(mdAction.code);
              }}
            >
              <Tooltip title="Add Special Text" placement="right">
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            <HelpDialog />
            <SaveDialog content={mdContent} />
            {/* <ListItem */}
            {/*  button */}
            {/*  onClick={() => { */}
            {/*    handleSave(); */}
            {/*  }} */}
            {/* > */}
            {/*  <Tooltip title="Save" placement="right"> */}
            {/*    <ListItemIcon className={classes.iconText}> */}
            {/*      <Save /> */}
            {/*    </ListItemIcon> */}
            {/*  </Tooltip> */}
            {/* </ListItem> */}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <TextField
          // contentEditable="true"
            id="standard-multiline-flexible"
            innerRef={textareaRef}
            onBlur={saveCursorPosition}
            multiline
            rowsMax={2000}
            value={mdContent}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <Typography paragraph>
            {/* {content} */}
          </Typography>
        </main>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography
            paragraph
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          >
            {/* <div  /> */}
          </Typography>
        </main>
      </div>
    </>
  );
}
