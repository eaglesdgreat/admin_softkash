import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Box,
  Container,
  TextField,
  Typography,
  Grid,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import { useRouter } from 'next/router'

import { authenticate } from './../lib/auth.helper'
import { useStateValue } from '../StateProviders';
import LoginDialog from '../components/LoginDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    paddingTop: 100,
    paddingBottom: 250,
    backgroundColor: '#F0FAF4'
  },
  card: {
    width: '400px',
    height: 'auto',
    paddingTop: '5%',
    paddingBottom: '5%',
    margin: 'auto',
    alignItems: 'center',
    borderRadius: '10px'
  },
  box: {
    width: '80%',
    margin: 'auto',
    alignItem: 'center',
    // border: '1px solid red',
  },
  typography: {
    lineHeight: '35px',
    fontSize: '25px',
    fontWeight: 'bold',
    fontFamily: 'Source Sans Pro',
    letterSpacing: '0.01em',
    fontStyle: 'normal',
    color: '#000000',
    textAlign: 'center',
  },
  textField: {
    borderRadius: "6px",
    // height: '45px',
    margin: 'auto',
    '& input': {
      color: '#182C51',
      fontSize: '16px',
      fontWeight: 'bold',
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      lineHeight: '20px',
    },
    "& ::placeholder": { fontSize: "12px", fontWeight: '500' },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    fontSize: "14px"
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    fontSize: "14px",
    boxShadow: "none",
    padding: '10px',
    fontWeight: '600',
    marginTop: theme.spacing(4),
  },
}))

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;

// validate input field 
const validations = (value, name, required = true, type, secondValue) => {

  // validation for required field 
  if (required && !value) {
    return { message: `${name} is required`, status: true }
  }

  // validation for email field 
  if (type === 'email' && !emailRegex.test(value)) {
    return { message: `${name} is invalid`, status: true }
  }

  // validation for password 
  if (type === 'password' && !passwordRegex.test(value)) {
    return { message: `${name} must contain at least a number and a letter`, status: true }
  }

  return { message: '', status: false };
}



export default function Index() {
  const classes = useStyles()
  const router = useRouter()

  const [{ loginDialog }, dispatch] = useStateValue();
  const [value, setValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  
  const errorMessageStyle = {
    color: "red",
    fontSize: "10px",
    fontWeight: "bolder",
    fontStyle: "oblique",
  }

  const initialState = {
    email: '',
    password: ''
  }

  const [state, setState] = useState(initialState)
  const [messages, setMessages] = useState({
    ...initialState,
    success: '',
    failure: '',
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValid = true

    if (isValid) {
      const validate = validations(state.email, 'Email', true, 'email');
      if (validate.status) {
        setMessages({ ...messages, email: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validatePass = validations(state.password, 'password');
      if (validatePass.status) {
        setMessages({ ...messages, password: validatePass.message });
        isValid = false;
      }
    }

    const body = {
      email: state.email || null,
      password: state.password || null,
    }


    const url = `${process.env.BACKEND_URL}/api/admin/login`

    if (isValid) {
      setLoading(true); 

      try {
        const response = await axios.post(url, body)
        console.log(response.data.response_message.split('[')[1].split(']')[0])
        const token = response.data.response_message.split('[')[1].split(']')[0]
        setValue(token)
        setEmailValue(state.email)

        if(response.data) {
          setMessages({ ...messages, success: `Token has been send to your email` });
          setState(initialState)
          setOpen(true)
          setLoading(false);

          dispatch({
            type: 'OPEN_LOGIN_DIALOG',
            items: true
          })

          // authenticate(response.data.data, () => {
          //   return router.push('/dashboard')
          // })
        }
      } catch (e) {
        setLoading(false);
        console.log(e)
        // if (e.response.data) {
        //   setMessages({ ...messages, failure: `${e.response.data.response_message}. Try again or click forget password` })
        //   setOpen(true)
        //   setState(initialState)
        // }
      }
    }
  }

  const clearError = () => {
    setMessages({ ...initialState, success: '', failure: '' });
  }


  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Box
          display="flex"
          className={classes.box}
        >
          <Card className={classes.card}>

            <CardContent>
              <Typography className={classes.typography}>
                Admin Login
              </Typography>

              {/* {messages.failure && (
                <span style={errorMessageStyle}>{messages.failure}</span>
              )} */}

              <Box
                display="flex"
                justifyContent="center"
                className={classes.box}
                style={{ width: '60%' }}
              >
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        className={classes.textField}
                        type="email"
                        placeholder="Email"
                        id="email"
                        name='email'
                        variant="outlined"
                        size="small"
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                        value={state.email}
                        onChange={handleChange}
                      // onKeyUp={''}
                      />
                      {messages.email && (
                        <span style={errorMessageStyle}>{messages.email}</span>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        className={classes.textField}
                        type="password"
                        placeholder="Password"
                        id="password"
                        name='password'
                        variant="outlined"
                        size="small"
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                        value={state.password}
                        onChange={handleChange}
                      // onKeyUp={''}
                      />
                      {messages.password && (
                        <span style={errorMessageStyle}>{messages.password}</span>
                      )}
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "#007945", color: "white" }}
                    className={classes.submit}
                  >
                    {loading ? <CircularProgress size="2em" style={{ color: '#fff' }} /> : 'LOGIN'}
                  </Button>
                </form>

                <LoginDialog authToken={value} email={emailValue} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {
        messages.failure &&
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          autoHideDuration={10000}
          message={
            <Alert severity="error" style={{ maxWidth: '1440px' }}
              onClose={() => clearError()}
              color="error">
              {messages.failure}
            </Alert>
          }
        />
      }

      {
        messages.success &&
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          autoHideDuration={15000}
          message={
            <Alert severity="success" style={{ maxWidth: '1440px' }}
              onClose={() => clearError()}
              color="info">
              {messages.success}
            </Alert>
          }
        />
      }
    </div>
  );
}
