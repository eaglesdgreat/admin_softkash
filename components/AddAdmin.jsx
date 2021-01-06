import React, { useState } from 'react'
import Layout from './Layout'
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
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import clsx from 'clsx';
import axios from 'axios';
import { Add, Close } from '@material-ui/icons'
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
    marginBottom: "1.5rem",
  },
  label: {
    color: "000000, 90%",
    fontWeight: 400,
  },
  buttonBox: {
    textAlign: "right",
    margin: "4.5rem 0 2rem 0",
  },
}))



function AddAdmin() {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const errorMessageStyle = {
    color: "red",
    fontSize: "13px",
    fontWeight: "bolder",
    fontStyle: "oblique"
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
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }


  const validateField = (e) => {

    if (e.target.name === 'first_name') {
      const validate = validations(input.first_name, 'First Name');
      if (validate.status) {
        setMessages({ ...messages, firstName: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, firstName: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'lastName') {
      const validate = validations(state.lastName, 'Last Name');
      if (validate.status) {
        setMessages({ ...messages, lastName: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, lastName: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'email') {
      const validate = validations(state.email, 'Email', true, 'email');
      if (validate.status) {
        setMessages({ ...messages, email: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, email: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'phone') {
      const validate = validations(state.phone, 'Phone Number', true, 'digits');
      if (validate.status) {
        setMessages({ ...messages, phone: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, phone: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'password') {
      const validate = validations(state.password, 'Password', true, 'password');
      if (validate.status) {
        setMessages({ ...messages, password: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, password: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'passwordConfirmation') {
      const validate = validations(state.passwordConfirmation, 'Confirm Password', true, 'compare', state.password);
      if (validate.status) {
        setMessages({ ...messages, passwordConfirmation: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, passwordConfirmation: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'address') {
      const validate = validations(state.address, 'Address');
      if (validate.status) {
        setMessages({ ...messages, address: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, address: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'city') {
      const validate = validations(state.address, 'City');
      if (validate.status) {
        setMessages({ ...messages, city: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, city: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'faculty') {
      const validate = validations(state.faculty, 'Faculty');
      if (validate.status) {
        setMessages({ ...messages, faculty: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, faculty: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'department') {
      const validate = validations(state.department, 'Department');
      if (validate.status) {
        setMessages({ ...messages, department: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, department: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'matricNumber') {
      const validate = validations(state.matricNumber, 'Matric Number');
      if (validate.status) {
        setMessages({ ...messages, matricNumber: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, matricNumber: '', success: '', failure: '' });
      }
    }
  }

  // Add influencer form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = { ...input }
    console.log(body)

    // const token = isAuthenticated().authToken
    const url = `${process.env.BACKEND_URL}/api/admin/login`

    try {
      const response = await axios.post(
        url,
        body,
        // { headers: { authenticate: token } }
      )

      console.log(response);

      if (response.data.success) {
        enqueueSnackbar("Admin Created Successfully", {
          variant: 'success',
        });
      }
    } catch (error) {
      enqueueSnackbar("Admin could not be created. Try again", {
        variant: 'error',
      });
      console.log(error);
    }

    setOpen(false);
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
              <Button style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: "2px",
                width: "4.2rem",
                padding: 0,
                margin: "1rem 0 2rem 0"
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

              <h2 style={{ marginBottom: "3rem" }} id="transition-modal-title">Add Admin User</h2>

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
                    />
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
                    />
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
                    value={input.email}
                    onChange={handleInputChange}
                  />
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
                    />
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
                    />
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
                    />
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
                    />
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
                      value={input.password}
                      onChange={handleInputChange}
                    />
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Confirm Password</Typography>
                    <InputBase
                      className={classes.textField}
                      variant="outlined"
                      type="text"
                      value={input.confirm_password}
                      name="confirm_password"
                      onChange={handleInputChange}
                    />
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
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    <Typography style={{ fontSize: "0.9rem", }}>
                      ADD
                    </Typography>
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
