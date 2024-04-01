import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import {read} from './api-laundry.js'
import {Redirect, Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Edit from '@material-ui/icons/Phone.js'

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
  productTitle: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%',
    fontSize: '1.2em'
  }
}))

export default function Shop({match}) {
  const classes = useStyles()
  const [laundry, setShop] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    // listByShop({
    //   laundryId: match.params.laundryId
    // }, signal).then((data)=>{
    //   if (data.error) {
    //     setError(data.error)
    //   } 
    // })
    read({
      laundryId: match.params.laundryId
    }, signal).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setShop(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.laundryId])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    // listByShop({
      
    //   laundryId: match.params.laundryId
    // }, signal).then((data)=>{
    //   if (data.error) {
    //     setError(data.error)
    //   } 
    // })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.laundryId])

    const logoUrl = laundry._id
          ? `/api/laundry/logo/${laundry._id}?${new Date().getTime()}`
          : '/api/laundry/defaultphoto'
    return (<div className={classes.root}>
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
                  {laundry.location}
                </Typography><br/>
                <Link to={"/bookings/" + match.params.laundryId}>
                      <IconButton aria-label="Edit" color="primary">
                        <Edit/>
                      </IconButton>
                    </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={8}>
          <Card>
                     </Card>
        </Grid>
      </Grid>
    </div>)
}
