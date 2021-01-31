import React, { useState } from 'react'
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputBase
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'
import clsx from 'clsx';
import { useSnackbar } from 'notistack'

import TableLayout from './../components/Tables'
import { useStateValue } from '../StateProviders';
import { authenticate } from './../lib/auth.helper'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgba(0, 121, 69, 0.05)',
    borderRadius: '25px'
  },
  typography: {
    fontFamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '28px',
    letterSpacing: '-1%',
    color: '#007945',
  },
  box: {
    fontFamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    letterSpacing: '0.1px',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
    border: '1px solid #E4EBF6',
    borderRadius: '4px',
  },
  button2: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    }
  },
  tContainer: {
    border: '1px solid #E4EBF6',
    borderRadius: '10px',
    background: '#FFFFFF'
  },
  box2: {
    paddingRight: 20,
    width: '100%',
    display: 'flex',

  },
}))


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: '5px',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    border: '1px solid #00487C',
    fontSize: '16px',
    lineHeight: '20px',
    fontStyle: 'normal',
    fontWeight: '700',
    padding: '10px 3px 10px 10px',
    color: '#182C51',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Source Sans Pro',
    '&:focus': {
      borderRadius: '5px',
      borderColor: '#00487C',
      backgroundColor: '#FFFFFF',
    },
  },
}))(InputBase);



export default function TokenDialog({ authToken, email }) {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState()

  const [{ loginDialog }, dispatch] = useStateValue();
  console.log(email)

  const handleChange = (event) => {
    const { name, value } = event.target

    setToken(value)
  }

  const validateField = (e) => {
    const { name, value } = e.target

    if (name === 'token' && value !== '') {
      setDisable(false)
    }

    if (name === 'token' && value === '') {
      setDisable(true)
    }
  }

  // click open dialog pop up
  // const handleDialogClick = () => {
  //   setOpen(true)
  // }

  // handle dialog close changes
  const handleDialogClose = () => {
    dispatch({
      type: 'OPEN_LOGIN_DIALOG',
      items: false
    })
  }

  // token handler 
  const handleToken = async (e) => {
    e.preventDefault()

    setLoading(true);
    const url = `${process.env.BACKEND_URL}/api/admins`

    try {
      const response = await axios.get(url)
      console.log(response)
      const admin = response.data.data.find(adm => adm.email === email)
      console.log(admin)

      if (token === authToken) {
        // setLoading(false);

        enqueueSnackbar(`Login Successful. You are being redirected to your dashboard`, {
          variant: 'success',
        });

        authenticate({ token: authToken, ...admin }, () => {
          return router.push('/dashboard')
        })
      }

      // handleDialogClose()

      if (token !== authToken) {
        setLoading(false);
  
        enqueueSnackbar(`Invalid Token Provided. Try again`, {
          variant: 'error',
        });
      }
    } catch (e) {
      console.log(e)

      if (e) {
        setLoading(false);
  
        enqueueSnackbar(`Invalid Token Provided. Try again`, {
          variant: 'error',
        });
      }
    }
  }

  return (
    <Dialog
      open={loginDialog}
      onClose={handleDialogClose}
      BackdropProps={{
        style: {
          opacity: .6
        }
      }}
      PaperProps={{
        style: {
          borderRadius: '8px',
          width: '428px',
          // height: '369px',
          paddingBottom: '5%',
          paddingTop: '2.5%',
          boxShadow: 'none'
        }
      }}
    >
      <DialogTitle>
        <Typography
          className={classes.typography}
          style={{
            fontWeight: '600',
            fontSize: '24px',
            lineHeight: '28px',
          }}
        >
          Enter Token Here
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box
          display="flex"
          component="span"
        // style={{
        //   whiteSpace: 'initial',
        // }}
        >
          <FormControl className={classes.formControl} style={{ width: '100%' }}>
            <BootstrapInput
              id="last-name"
              value={token}
              name="token"
              required
              onChange={handleChange}
              onKeyUp={validateField}
            />
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box
          display="flex"
          style={{
            // margin: 'auto',
            marginRight: '25px',
            // border: '1px solid red',
          }}
        >
          <Button
            size="large"
            disabled={disable}
            className={classes.button2}
            onClick={handleToken}
            disableRipple
            style={{
              border: disable ? '1px solid grey' : '1px solid #007945',
            }}
          >
            {
              loading
                ? <CircularProgress size="2em" style={{ color: '#007945' }} /> :
                <Typography
                  className={classes.typography}
                  style={{
                    textAlign: 'center',
                    color: disable ? 'grey' : '#007945',
                    fontSize: '13px',
                    fontWeight: '500',
                    lineHeight: '15px',
                    textTransform: 'uppercase',
                    lineSpacing: '0.02em'
                  }}
                >
                  send
                </Typography>
            }
          </Button>

          <Button
            size="large"
            className={classes.button}
            onClick={handleDialogClose}
            disableRipple
            style={{
              border: '1px solid #007945',
              backgroundColor: '#007945',
              marginLeft: '20px'
            }}
          >
            <Typography
              className={classes.typography}
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '500',
                lineHeight: '15px',
                textTransform: 'uppercase',
                lineSpacing: '0.02em'
              }}
            >
              cancel
            </Typography>
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}