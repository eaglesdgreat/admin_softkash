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
import { Add, Close } from '@material-ui/icons'




const useStyles = makeStyles((theme) => ({
  typography: {
    fontfamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '64px',
    color: '#007945',
    lineHeight: '28px',
    letterSpacing: '0.1px'
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
    width: '100%',
    height: '100%',
    maxWidth: "1440px",
    paddingTop: '25px',
    paddingBottom: '25px',
    // paddingRight: '10px',
    paddingLeft: '30px',
    // boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.05)',
    // [theme.breakpoints.down('md')]: {
    //   width: '96%',
    // },
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
    fontWeight: 500,
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




function Tables(props) {
  const classes = useStyles()
  const router = useRouter()
  const { path, name, width, currentPath } = props

  // const [values, setValues] = useState(tableNav);

  // const handleChange = (event, newValue) => {
  //   setValues(
  //     values
  //       .map(value => ({ ...value, active: false }))
  //       .map((value, index) => ({
  //         ...value,
  //         active: index === newValue
  //       }))
  //   );
  // };

  // const active = values.findIndex(value => value.active)

  // const path = values.find(value => value.active).link

  return (
    <Layout path={path}>
      <Box
        display="flex"
        flexDirection="column"
        style={{
          marginTop: '-50px',
          paddingLeft: '2.5%',
          width: '100%',
        }}
      >
        {/* <Box style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%"
        }}>
          <Typography className={classes.typography}>
            {name}
          </Typography>
        </Box> */}

        <Box
          display="flex"
          flexDirection="column"
          className={classes.bodyWidth}
          style={{
            // border: '1px solid #EAEAEA',
            background: 'rgba(0, 121, 69, 0.05)',
            borderRadius: '25px',
            marginTop: '10px',
          }}
        >
          <main>
            {props.children}
          </main>
        </Box>
      </Box>
    </Layout>
  )
}

Tables.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(Tables)
