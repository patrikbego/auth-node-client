import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DOMPurify from 'dompurify';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Help } from '@material-ui/icons';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import mdToHtml from '../../utils/mdUtils';

const content = '\n'
    + '\n'
    + '# Heading level 1\n'
    + '\n'
    + '\n'
    + '...\n'
    + '\n'
    + '###### Heading level 6\n'
    + '\n'
    + 'Heading level 1\n'
    + '===============\n'
    + '\n'
    + '\n'
    + 'Heading level 2\n'
    + '---------------\n'
    + '\n'
    + '## Here\'s a Heading\n'
    + '\n'
    + '\n'
    + '#Here\'s a Heading\n'
    + '\n'
    + 'To create paragraphs, use a blank line to   \n'
    + '\n'
    + 'separate one or more lines of text.\n'
    + '\n'
    + 'To create a line break (<br>), end a line with two or more spaces, and then type return.\n'
    + '\n'
    + '**bold text**.  \n'
    + '__bold text__\n'
    + '\n'
    + '*italic text*.  \n'
    + '_italic_text. \n'
    + 'A*cat*meow\n'
    + '\n'
    + 'This text is ___really important___.\n'
    + '\n'
    + '> To create a blockquote, add a > in front of a paragraph.  \n'
    + '\n'
    + '> Blockquotes can contain multiple paragraphs. \n'
    + '>\n'
    + '> Add a > on the blank lines between the paragraphs.\n'
    + '\n'
    + '\n'
    + '> Blockquotes can be nested.\n'
    + '>> Add a >> in front of the paragraph you want to nest.\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '> #### Mixed Example\n'
    + '>\n'
    + '> - Blockquotes can have all sort of elements\n'
    + '> - Profits were higher than ever.\n'
    + '>\n'
    + '>  *Italic* or **bold**.\n'
    + '\n'
    + '1. First item\n'
    + '2. Second item\n'
    + '3. Third item\n'
    + '4. Fourth item\n'
    + '---\n'
    + '1. First item\n'
    + '1. Second item\n'
    + '1. Third item\n'
    + '1. Fourth item\n'
    + '---\n'
    + '1. First item\n'
    + '2. Second item\n'
    + '3. Third item\n'
    + '    1. Indented item\n'
    + '    2. Indented item\n'
    + '4. Fourth item\n'
    + '---\n'
    + '- First item\n'
    + '- Second item\n'
    + '- Third item\n'
    + '- Fourth item\n'
    + '\n'
    + '![Tux, the Linux mascot](https://css-tricks.com/wp-content/uploads/2021/04/wpn-20210416.jpg)\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '\n'
    + '1. First item\n'
    + '2. Second item\n'
    + '3. Third item\n'
    + '    - Indented item\n'
    + '    - Indented item\n'
    + '4. Fourth item\n'
    + '\n'
    + '\n'
    + '\n'
    + '***\n'
    + '---\n'
    + '_________________\n'
    + '\n'
    + '\n'
    + 'My favorite search engine is [Duck Duck Go](https://duckduckgo.com).\n'
    + '\n'
    + '<https://www.markdownguide.org>\n'
    + '<fake@example.com>\n'
    + '\n'
    + '<h2>An Unordered HTML List</h2>\n'
    + '\n'
    + '<ul>\n'
    + '  <li>Coffee</li>\n'
    + '  <li>Tea</li>\n'
    + '  <li>Milk</li>\n'
    + '</ul>  \n'
    + '\n'
    + '<h2>An Ordered HTML List</h2>\n'
    + '\n'
    + '<ol>\n'
    + '  <li>Coffee</li>\n'
    + '  <li>Tea</li>\n'
    + '  <li>Milk</li>\n'
    + '</ol> \n'
    + '\n'
    + '```\n'
    + 'let {this is / special block}\n'
    + '<every character> is allowed here\n'
    + '```\n';

let sanitizer = (a) => a;
if (typeof window !== 'undefined') sanitizer = DOMPurify.sanitize;

const styles = (defTheme) => ({
  root: {
    margin: 0,
    padding: defTheme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: defTheme.spacing(1),
    top: defTheme.spacing(1),
    color: defTheme.palette.grey[500],
  },
});

const useStyles = makeStyles((defTheme) => ({
  mdContent: {
    flexGrow: 1,
    padding: defTheme.spacing(3),
    width: '50px',
  },
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

export default function HelpDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [parsedContent, setParsedContent] = React.useState();
  mdToHtml(content).then((e) => {
    e = `${'<style>\n'
        + '  h1 {color:red;}\n'
        + '  p {color:blue;}\n'
        + '  img {width:50%;}\n'
        + '</style>'}${
      e}`;

    setParsedContent(e);
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem
        button
        onClick={handleClickOpen}
      >
        <ListItemIcon>
          <Help />
        </ListItemIcon>
      </ListItem>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}> */}
      {/*  Open dialog */}
      {/* </Button> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Editor Helper
        </DialogTitle>
        <Divider />
        <div className={classes.paragraphContent}>
          <p>
            This is a simple Markdown editor (a text-to-HTML conversion tool).
            Below is the example of what it can be acchieved with simple text formats.
          </p>
        </div>
        <DialogContent dividers>
          <main className={styles.mdContent}>
            {/* <div className={classes.toolbar} /> */}
            <Typography style={{ whiteSpace: 'pre-line' }}>
              {content}
            </Typography>
          </main>
          <main className={styles.mdContent}>
            {/* <div className={classes.toolbar} /> */}
            <Typography
              paragraph
              // dangerouslySetInnerHTML={{ __html: sanitizer(parsedContent) }}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          </main>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
