import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Tooltip } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatSize,
  Photo,
} from '@material-ui/icons';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import * as PropTypes from 'prop-types';
import React from 'react';
import HelpDialog from './HelpDialog';
import SaveDialog from './SaveDialog';
import mdToHtml from '../../utils/mdUtils';

export default function EditorSideDrawer(props) {
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
  const addMdElement = async (e) => {
    switch (e) {
      case mdAction.bold:
        props.setMdContent([
          props.mdContent.slice(0, props.selStart),
          `**${props.selValue || 'Text'}**`,
          props.mdContent.slice(props.selEnd)].join(''));
        break;
      case mdAction.italic:
        props.setMdContent([
          props.mdContent.slice(0, props.selStart),
          `*${props.selValue || 'Text'}*`,
          props.mdContent.slice(props.selEnd)].join(''));
        break;
      case mdAction.h1:
        props.setMdContent([
          props.mdContent.slice(0, props.selStart),
          `# ${props.selValue || 'Text'}`,
          props.mdContent.slice(props.selEnd)].join(''));
        break;
      case mdAction.h2:
        props.setMdContent([
          props.mdContent.slice(0, props.selStart),
          `## ${props.selValue || 'Text'}`,
          props.mdContent.slice(props.selEnd)].join(''));
        break;
      case mdAction.h3:
        props.setMdContent([
          props.mdContent.slice(0, props.selStart),
          `### ${props.selValue || 'Text'}`,
          props.mdContent.slice(props.selEnd)].join(''));
        break;
      case mdAction.listNumbered:
        props.setMdContent([
          props.mdContent.slice(0, props.selStart),
          `1. ${props.selValue || 'Text'}`,
          props.mdContent.slice(props.selEnd)].join(''));
        break;
      case mdAction.code:
        props.setMdContent([
          props.mdContent.slice(0, props.selStart),
          `\`\`\`${props.selValue || 'Text'}\`\`\``,
          props.mdContent.slice(props.selEnd)].join(''));
        break;
      case mdAction.image:
        props.setMdContent([
          props.mdContent.slice(0, props.selStart),
          `![alt text](${props.selValue || 'Text'})`,
          props.mdContent.slice(props.selEnd)].join(''));
        break;
      default:
        console.info('Md action not found!');
    }
    const contentHtml = await mdToHtml(props.mdContent);
    props.setParsedContent(contentHtml);
  };

  return (
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
        <SaveDialog content={props.mdContent} itemId={props.itemId} userId={props.userId} originalTags={props.tags} />
      </List>
    </Drawer>
  );
}

EditorSideDrawer.propTypes = {
  classes: PropTypes.any,
  open: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.any,
  mdContent: PropTypes.any,
  setMdContent: PropTypes.any,
  selStart: PropTypes.any,
  setSelStart: PropTypes.func,
  selEnd: PropTypes.any,
  setSelEnd: PropTypes.func,
  selValue: PropTypes.any,
  setSelValue: PropTypes.func,
  setParsedContent: PropTypes.func,
  itemId: PropTypes.number,
  userId: PropTypes.userId,
  tags: PropTypes.string,
};
