import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Copyright from './Copyright';
import Link from './Link';

const useStyles = makeStyles((defTheme) => ({
  footer: {
    borderTop: `1px solid ${defTheme.palette.divider}`,
    // marginTop: defTheme.spacing(8),
    paddingTop: defTheme.spacing(1),
    paddingBottom: defTheme.spacing(1),
    textAlign: 'center',
    // [defTheme.breakpoints.up('sm')]: {
    //   paddingTop: defTheme.spacing(6),
    //   paddingBottom: defTheme.spacing(6),
    // },
  },
}));

const footers = [
  {
    title: 'Company',
    description: [
      'Team',
      'Contact us',
    ],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Developer stuff'],
  },
  // {
  //   title: 'Resources',
  //   description: [
  //     'Resource',
  //     'Resource name',
  //     'Another resource',
  //     'Final resource'],
  // },
  {
    title: 'Legal',
    description: [
      'Privacy policy',
      'Terms of use'],
  },
];

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs key={footer.title}>
              <Typography variant="h6" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
