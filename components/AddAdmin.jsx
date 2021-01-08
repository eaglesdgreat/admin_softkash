import React, { useState } from 'react'
import Layout from './Layout'
// import http from 'http2'
import {
  Box,
  Typography,
  Button,
  Divider,
  AppBar,
  Tabs,
  Tab,
  withWidth,
  Toolbar,
  Hidden,
  Modal,
  Backdrop,
  Fade,
  InputBase,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import clsx from 'clsx';
import axios from 'axios';
import { Add, Close } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack'

import validations from '../lib/validations';




const useStyles = makeStyles((theme) => ({
  typography: {
    fontfamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    color: '#2F3237',
    lineHeight: '28px',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#FFFFFF',
  },
  appbar: {
    backgroundColor: '#FFFFFF00',
    boxShadow: 'none',
    color: '#242120',
    display: 'flex',
    width: '100%',
  },
  tab1: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "50%",
      width: "50%",
    }
  },
  indicator: {
    backgroundColor: '#FF5C00',
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
  scrollmenu: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  anchor: {
    display: 'inline-block',
    textDecoration: 'none',
    padding: '14px',
  },
  bodyWidth: {
    width: '95%',
    maxWidth: "1440px",
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.down('md')]: {
      width: '96%',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#FFFFFF",
    borderRadius: '8px',
    border: "none",
    height: '98%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 8, 3),
    "&:focus": {
      outline: "none"
    }
  },
  textField: {
    border: "1px solid #EAEAEA",
    borderRadius: "5px",
    width: "100%",
    height: "42px",
    padding: "1rem",
    fontSize: "0.9rem",
  },
  label: {
    color: "000000, 90%",
    fontWeight: 400,
  },
  buttonBox: {
    textAlign: "right",
    margin: "1.5rem 0 2rem 0",
  },
  usertype: {
    display: 'block',
    '& > label > span.MuiFormControlLabel-label': {
      fontSize: '14px'
    },
    '& > label > span > span > div > svg.MuiSvgIcon-root': {
      height: '0.7em',
      width: '0.7em'
    }
  }
}))



function AddAdmin() {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const errorMessageStyle = {
    color: "red",
    fontSize: "11px",
    fontWeight: "bold",
    fontStyle: "normal",
    marginBottom: "1.0rem"
  };

  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    department: "",
    password: "",
    confirm_password: "",
    role_name: "",
    role_id: "",
    staff_id: "",
  };

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState({
    ...initialState, success: '', failure: ''
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [input, setInput] = useState(initialState);

  const handleAddInfluencerOpen = () => {
    setOpen(true);
  };

  const handleAddInfluencerClose = () => {
    setOpen(false);
    setInput(initialState);
    setMessages({ ...initialState, success: '', failure: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }


  const validateField = (e) => {

    if (e.target.name === 'first_name') {
      const validate = validations(input.first_name, 'First Name');
      if (validate.status) {
        setMessages({ ...messages, first_name: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, first_name: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'last_name') {
      const validate = validations(input.last_name, 'Last Name');
      if (validate.status) {
        setMessages({ ...messages, last_name: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, last_name: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'email') {
      const validate = validations(input.email, 'Email', true, 'email');
      if (validate.status) {
        setMessages({ ...messages, email: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, email: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'phone_number') {
      const validate = validations(input.phone_number, 'Phone Number', true, 'digits');
      if (validate.status) {
        setMessages({ ...messages, phone_number: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, phone_number: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'password') {
      const validate = validations(input.password, 'Password', true, 'password');
      if (validate.status) {
        setMessages({ ...messages, password: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, password: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'confirm_password') {
      const validate = validations(input.confirm_password, 'Confirm Password', true, 'compare', input.password);
      if (validate.status) {
        setMessages({ ...messages, confirm_password: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, confirm_password: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'role_id') {
      const validate = validations(input.role_id, 'Role Id');
      if (validate.status) {
        setMessages({ ...messages, role_id: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, role_id: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'staff_id') {
      const validate = validations(input.staff_id, 'Staff Id');
      if (validate.status) {
        setMessages({ ...messages, staff_id: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, staff_id: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'department') {
      const validate = validations(input.department, 'Department');
      if (validate.status) {
        setMessages({ ...messages, department: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, department: '', success: '', failure: '' });
      }
    }
  }

  // Add influencer form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    if (isValid) {
      const validate = validations(input.first_name, 'First Name');
      if (validate.status) {
        setMessages({ ...messages, first_name: validate.message });
        isValid = false;
      }
    }


    if (isValid) {
      const validate = validations(input.last_name, 'Last Name');
      if (validate.status) {
        setMessages({ ...messages, last_name: validate.message });
        isValid = false;
      }
    }


    if (isValid) {
      const validate = validations(input.email, 'Email', true, 'email');
      if (validate.status) {
        setMessages({ ...messages, email: validate.message });
        isValid = false;
      }
    }


    if (isValid && input.phone_number) {
      const validate = validations(input.phone_number, 'Phone Number', true, 'digits');
      if (validate.status) {
        setMessages({ ...messages, phone_number: validate.message });
        isValid = false;
      }
    }


    if (isValid) {
      const validate = validations(input.password, 'Password', true, 'password');
      if (validate.status) {
        setMessages({ ...messages, password: validate.message });
        isValid = false;
      }
    }


    if (isValid) {
      const validate = validations(input.confirm_password,
        'Password Confirmation', true, 'compare', input.password);
      if (validate.status) {
        setMessages({ ...messages, confirm_password: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validate = validations(input.role_name, 'Role Name');
      if (validate.status) {
        setMessages({ ...messages, role_name: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validate = validations(input.role_id, 'Role Id');
      if (validate.status) {
        setMessages({ ...messages, role_id: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validate = validations(input.staff_id, 'Staff Id');
      if (validate.status) {
        setMessages({ ...messages, staff_id: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validate = validations(input.department, 'Department');
      if (validate.status) {
        setMessages({ ...messages, department: validate.message });
        isValid = false;
      }
    }

    const body = {
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      phone_number: input.phone_number,
      department: input.department,
      password: input.password,
      role_name: input.role_name,
      role_id: input.role_id,
      staff_id: input.staff_id,
    }
    // console.log(body)
    const url = `${process.env.BACKEND_URL}/api/admins`

    if (isValid) {
      setLoading(true);

      try {
        const response = await axios.post(
          url,
          body,
        )
        console.log(response.data)

        // const router = useRouter()

        // if (response.data.success === true) {
          // router.push('/verifyemail')
          setLoading(false);

          setMessages({ ...messages, success: response.data.response_message });
          setInput(initialState);
          setOpen(false);

          enqueueSnackbar(`Admin Created Successfully`, {
            variant: 'success',
          });
        // }

      } catch (e) {
        console.log(e.response);

        setLoading(false);

        if (e.response) {
          if (e.response.status >= 500) {
            setMessages({
              ...messages, failure:
                `We are sorry. We can't process your 
          request at the moment, please try again later` })

            enqueueSnackbar("We are sorry. We can't process your request at the moment, please try again later", {
              variant: 'error',
            });
          } else {
            setMessages({ ...messages, failure: e.response.data.response_message })
            enqueueSnackbar("Admin could not be created. Try again", {
              variant: 'error',
            });
          }
        }

      }

    }
  }

  const clearError = () => {
    setInput(initialState);
    setMessages({ ...initialState, success: '', failure: '' });
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        // marginTop: '-50px',
        // paddingLeft: '2.5%',
        width: '100%',
      }}
    >
      <Box style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
      }}>
        {/* <Typography className={classes.typography}>
          {name}
        </Typography> */}
        <Button style={{
          background: "#FFFFFF",
          color: "#007945",
          borderRadius: "6px",
          border: '1px solid #007945',
        }}
          onClick={handleAddInfluencerOpen}
        >
          <Add style={{ fontSize: "1.0rem", marginRight: "0.1rem" }} />
          <Typography style={{ fontSize: "0.6rem", fontWeight: 500 }}>
            ADMIN
          </Typography>
        </Button>
      </Box>

      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleAddInfluencerClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box className={classes.paper}>
              <Box
                display="flex"
              >
                <h2 style={{ marginBottom: "1.5rem", color: '#007945' }} id="transition-modal-title">Add Admin User</h2>

                <Button style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderRadius: "2px",
                  width: "4.2rem",
                  padding: 0,
                  marginLeft: "15.5rem"
                }}
                  size="large"
                  disableRipple
                  onClick={handleAddInfluencerClose}
                >
                  <Close style={{
                    fontWeight: 500, fontSize: "1.2rem",
                    color: "#000000", marginRight: "0.3rem"
                  }} />
                  <Typography style={{ fontWeight: 400, color: "#242120" }}>
                    Close
                  </Typography>
                </Button>
              </Box>

              {messages.failure &&
                <Alert severity="error" style={{ width: '100%' }}
                  onClose={() => clearError('failure')}
                  color="error">
                  {messages.failure}
                </Alert>
              }

              {messages.success &&
                <Alert severity="success" style={{ width: '100%' }}
                  onClose={() => clearError('success')}
                  color="info">
                  {messages.success}
                </Alert>
              }

              <form noValidate onSubmit={handleSubmit}>
                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">First Name</Typography>

                    <InputBase
                      name="first_name"
                      className={classes.textField}
                      variant="outlined"
                      value={input.first_name}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.first_name ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.first_name && (
                        <span style={errorMessageStyle}>{messages.first_name}</span>
                      )}
                    </Box>
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Last Name</Typography>

                    <InputBase
                      name="last_name"
                      className={classes.textField}
                      variant="outlined"
                      value={input.last_name}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.last_name ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.last_name && (
                        <span style={errorMessageStyle}>{messages.last_name}</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Phone Number</Typography>

                    <InputBase
                      name="phone_number"
                      className={classes.textField}
                      variant="outlined"
                      value={input.phone_number}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.phone_number ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.phone_number && (
                        <span style={errorMessageStyle}>{messages.phone_number}</span>
                      )}
                    </Box>
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Department</Typography>

                    <InputBase
                      // style={{ height: "84px", }}
                      className={classes.textField}
                      variant="outlined"
                      // multiline
                      type="text"
                      // rows={4}
                      value={input.department}
                      name="department"
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.department ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.department && (
                        <span style={errorMessageStyle}>{messages.department}</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Staff Id</Typography>

                    <InputBase
                      name="staff_id"
                      className={classes.textField}
                      variant="outlined"
                      value={input.staff_id}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.staff_id ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.staff_id && (
                        <span style={errorMessageStyle}>{messages.staff_id}</span>
                      )}
                    </Box>
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Role Id</Typography>

                    <InputBase
                      className={classes.textField}
                      variant="outlined"
                      type="text"
                      value={input.role_id}
                      name="role_id"
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.role_id ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.role_id && (
                        <span style={errorMessageStyle}>{messages.role_id}</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    className={classes.label}
                    component="legend">Email</Typography>

                  <InputBase
                    name="email"
                    className={classes.textField}
                    variant="outlined"
                    type="email"
                    value={input.email}
                    onChange={handleInputChange}
                    onKeyUp={validateField}
                    style={{
                      marginBottom: messages.email ? '0px' : "1.0rem",
                    }}
                  />

                  <Box
                    display="flex"
                    style={{ width: '70%' }}
                  >
                    {messages.email && (
                      <span style={errorMessageStyle}>{messages.email}</span>
                    )}
                  </Box>
                </Box>

                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Password</Typography>

                    <InputBase
                      name="password"
                      className={classes.textField}
                      variant="outlined"
                      type="password"
                      value={input.password}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.password ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.password && (
                        <span style={errorMessageStyle}>{messages.password}</span>
                      )}
                    </Box>
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Confirm Password</Typography>

                    <InputBase
                      className={classes.textField}
                      variant="outlined"
                      type="password"
                      value={input.confirm_password}
                      name="confirm_password"
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.confirm_password ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.confirm_password && (
                        <span style={errorMessageStyle}>{messages.confirm_password}</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    className={classes.label}
                    component="legend"
                  >
                    Select Admin User Role
                  </Typography>
                  <RadioGroup
                    className={classes.usertype}
                    aria-label="roleName"
                    name="role_name"
                    value={input.role_name}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                    <FormControlLabel value="Super Admin" control={<Radio />} label="Super Admin" />
                  </RadioGroup>

                  <Box
                    display="flex"
                    style={{ width: '70%' }}
                  >
                    {messages.role_name && (
                      <span style={errorMessageStyle}>{messages.role_name}</span>
                    )}
                  </Box>
                </Box>

                <Box className={classes.buttonBox}>
                  <Button
                    style={{
                      color: "#888888",
                      borderRadius: "4px",
                      marginRight: "1rem",
                    }}
                    onClick={handleAddInfluencerClose}
                  >
                    <Typography style={{ fontSize: "0.9rem", }}>
                      CANCEL
                    </Typography>
                  </Button>

                  <Button
                    style={{
                      background: "#007945",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                      fontSize: "0.9rem"
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    {loading ? <CircularProgress size="2em" style={{ color: '#fff' }} /> : 'CREATE ADMIN'}
                  </Button>
                </Box>
              </form>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  )
}

export default AddAdmin
