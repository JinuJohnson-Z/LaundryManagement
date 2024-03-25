import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
import auth from '../auth/auth-helper.js'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/core/styles'
import {read, update} from './api-laundry.js'
import {Redirect} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import NewLaundry from './NewLaundry.jsx'

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
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))

export default function EditLaundry ({match}) {
  const classes = useStyles()
  const [values, setValues] = useState({
      name: '',
      location: '',
      image: '',
      redirect: false,
      error: '',
      id: ''
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      laundryId: match.params.laundryId
    }, signal).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, id: data._id, name: data.name, location: data.location, owner: data.owner.name})
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const clickSubmit = () => {
    let laundryData = new FormData()
    values.name && laundryData.append('name', values.name)
    values.location && laundryData.append('location', values.location)
    values.image && laundryData.append('image', values.image)
    update({
      laundryId: match.params.laundryId
    }, {
      t: jwt.token
    }, laundryData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, 'redirect': true})
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values,  [name]: value })
  }

    const logoUrl = values.id
          ? `/api/laundry/logo/${values.id}?${new Date().getTime()}`
          : '/api/laundry/defaultphoto'
    // if (values.redirect) {
    //   return (<Redirect to={'/seller/laundry'}/>)
    // }
    return (<div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography type="headline" component="h2" className={classes.title}>
                Edit Laundry
              </Typography>
              <br/>
              <Avatar src={logoUrl} className={classes.bigAvatar}/><br/>
              <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <Button variant="contained" color="default" component="span">
                  Change Logo
                  <FileUpload/>
                </Button>
              </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br/>
              <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
              <TextField
                id="multiline-flexible"
                label="location"
                multiline
                rows="3"
                value={values.location}
                onChange={handleChange('location')}
                className={classes.textField}
                margin="normal"
              /><br/>
              <Typography type="subheading" component="h4" className={classes.subheading}>
                Owner: {values.owner}
              </Typography><br/>
              {
                values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                  </Typography>)
              }
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
            </CardActions>
          </Card>
          </Grid>
          {/* <Grid item xs={6} sm={6}>
            <NewLaundry laundryId={match.params.laundryId}/>
          </Grid> */}
        </Grid>
    </div>)
}
