import React, {useEffect, useRef} from 'react';
import clsx from 'clsx';
import DOMPurify from 'dompurify';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {TextField} from '@material-ui/core';
import Header from '../Header';
import mdToHtml from '../../utils/mdUtils';
import EditorSideDrawer from './EditorSideDrawer';
import ReactMd from './ReactMd';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  mdContent: {
    color: theme.palette.type === 'light'
      ? 'black'
      : 'tomato',
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
  const textareaRef = useRef();
  const theme = useTheme();
  const classes = useStyles(theme);
  let sanitizer = (a) => a;
  if (typeof window !== 'undefined') sanitizer = DOMPurify.sanitize;
  const [open, setOpen] = React.useState(false);
  const [parsedContent, setParsedContent] = React.useState();
  const [mdContent, setMdContent] = React.useState(content.body);
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
        <EditorSideDrawer
          classes={classes}
          open={open}
          onClick={handleDrawerClose}
          theme={theme}
          mdContent={mdContent}
          setMdContent={setMdContent}
          selStart={selStart}
          setSelStart={setSelStart}
          selEnd={selEnd}
          setSelEnd={setSelEnd}
          selValue={selValue}
          setSelValue={setSelValue}
          setParsedContent={setParsedContent}
          itemId={content.id}
          tags={content.tags}
        />
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
          <ReactMd className={classes.mdContent} markdown={mdContent} />
          {/*<Typography*/}
          {/*  paragraph*/}
          {/*  dangerouslySetInnerHTML={{ __html: parsedContent }}*/}
          {/*>*/}
          {/*  /!* <div  /> *!/*/}
          {/*</Typography>*/}
        </main>
      </div>
    </>
  );
}
