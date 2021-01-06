import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import { Menu, MenuItem } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import clsx from 'clsx';
import { useRouter } from 'next/router'
import Link from 'next/link'

import { isAuthenticated } from '../lib/auth.helper'
import Notifications from './Notifications'
import Search from './Search'
import AddAdmin from './AddAdmin'

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#FFFFFF',
    // paddingRight: '1%',
    paddingBottom: '1%',
    paddingTop: '1%',
  },
  avatar: {
    color: '#FF5C00',
    backgroundColor: '#FAEAE1',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  typography: {
    fontFamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 'i8px',
    lineHeight: '21px',
    color: '#007945',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  notify: {
    textDecoration: 'none',
    '&:hover,&:focus,&:active,&:visited': {
      textDecoration: 'none',
    },
  }
}))



function Header(props) {
  const router = useRouter()
  const classes = useStyles()
  const { onDrawerToggle } = props;
  // const headName = isAuthenticated().user.first_name

  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  }

  const handleLogout = () => {
    logout(() => {
      setAnchorEl2(null);
      router.push('/')
    })
  }

  return (
    <React.Fragment>
      <Box
        display="flex"
        style={{
          width: '100%',
          // paddingTop: '1.5%',
          // paddingBottom: '1.5%',
        }}
      >
        <AppBar className={classes.appbar} position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              {/* <Hidden smUp> */}
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                  // className={classes.menuButton}
                  >
                    <img src="/handleBar.svg" alt="menu" />
                    {/* <MenuIcon style={{ backgroundColor: '#007945' }} /> */}
                  </IconButton>
                </Grid>
              {/* </Hidden> */}

              <Grid item />

              <Grid item>
                <Search />
              </Grid>

              <Grid item xs />

              <Grid item>
                <AddAdmin />
              </Grid>

              <Grid item>
                <Notifications />
              </Grid>

              <Grid item>
                <IconButton color="inherit"
                  disableRipple
                  style={{ marginRight: '-10px' }}
                >
                  {/* <Avatar className={classes.avatar}>{(headName ? headName : 'User').split('')[0]}</Avatar> */}
                  <img src="/avatar.svg" alt="avatar" />
                </IconButton>
              </Grid>

              <Grid item>
                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    className={classes.typography}
                    style={{
                      fontWeight: '400',
                      fontSize: '13px',
                      lineHeight: '28px',
                      color: '#007945',
                      letterSpacing: '0.1px'
                      // marginLeft: '-80px',
                      // marginRight: '5px'
                    }}
                  >
                    {isAuthenticated().first_name} {isAuthenticated().last_name}
                  </Typography>

                  <Typography
                    className={classes.typography}
                    style={{
                      fontWeight: '400',
                      fontSize: '11.5px',
                      lineHeight: '28px',
                      color: '#979797',
                      letterSpacing: '0.1px'
                      // marginLeft: '-80px',
                      // marginRight: '5px'
                    }}
                  >
                    {isAuthenticated().role_name}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
}

Header.propTypes = {
  // classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
