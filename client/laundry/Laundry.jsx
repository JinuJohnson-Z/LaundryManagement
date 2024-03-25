import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { read } from './api-laundry.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(1),
    color: theme.palette.openTitle
  },
  bigAvatar: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  addButton: {
    float: 'right'
  },
  leftIcon: {
    marginRight: "8px"
  }
}));

export default function Laundry({ match }) {
  const classes = useStyles();
  const [laundry, setLaundry] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const laundryData = await read({ laundryId: match.params.laundryId }, signal);
        setLaundry(laundryData);

        } catch (error) {
        setError(error.message);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [match.params.laundryId]);

  const logoUrl = laundry._id
    ? `/api/laundry/logo/${laundry._id}?${new Date().getTime()}`
    : '/api/laundry/defaultphoto';

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={4} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                {laundry.name}
              </Typography>
              <br/>
              <Avatar src={logoUrl} className={classes.bigAvatar}/><br/>
              <Typography type="subheading" component="h2" className={classes.subheading}>
                {laundry.description}
              </Typography><br/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
            <Typography type="title" className={classes.title}>
              New Laundrys
              <span className={classes.addButton}>
                <Link to="/seller/laundry/new">
                  <Button color="primary" variant="contained">
                    <Icon className={classes.leftIcon}>add_box</Icon>  New Laundry
                  </Button>
                </Link>
              </span>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}