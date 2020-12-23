import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'

// import { logout } from '../lib/auth.helper'
// import { isAuthenticated } from '../lib/auth.helper'



const categories = [
  {
    id: 'Dashboard',
    icon: <img src="/dashboard.svg" alt="home" />,
    activeIcon: <img src="/activeDashboard.svg" alt="home" />,
    path: "/dashboard"
  },
  {
    id: 'Borrowers List',
    icon: <img src="/borrowersLists.svg" alt="borrowers" />,
    activeIcon: <img src="/activeBorrowersList.svg" alt="borrowers" />,
    path: "/borrowerslist"
  },
  {
    id: 'Loans Pending Approval',
    icon: <img src="/loansPending.svg" alt="loanPending" />,
    activeIcon: <img src="/activeLoansPending.svg" alt="loanPending" />,
    path: "/loanspending"
  },
  {
    id: 'Loans Missed',
    icon: <img src="/loanMissed.svg" alt="loansMissed" />,
    activeIcon: <img src="/activeLoansMissed.svg" alt="loansMissed" />,
    path: "/loansmissed"
  },
  {
    id: 'Messages',
    icon: <img src="/messages.svg" alt="messages" />,
    activeIcon: <img src="/activeMessages.svg" alt="messages" />,
    path: "/messages"
  },
  {
    id: 'Employees',
    icon: <img src="/employees.svg" alt="employees" />,
    activeIcon: <img src="/activeEmployees.svg" alt="employees" />,
    path: "/employees"
  },
  {
    id: 'Module Permission Role',
    icon: <img src="/employees.svg" alt="admin" />,
    activeIcon: <img src="/activeEmployees.svg" alt="admin" />,
    path: "/modulepermission"
  },
  // {
  //   id: 'Central Wallet',
  //   icon: <img src="/dollar-sign.svg" alt="coupons" />,
  //   activeIcon: <img src="/dollarSignActive.svg" alt="coupons" />,
  //   path: "/centralwallet"
  // },
];

const styles = (theme) => ({
  header: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  item: {
    fontfamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '28px',
    letterSpacing: '0.1px',
    color: '#007945',
  },
  itemActiveItem: {
    fontfamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '28px',
    letterSpacing: '0.1px',
    color: '#FFFFFF',
    // '&:hover,&:focus': {
    //   backgroundColor: '#007945',
    // },
  },
  itemIcon: {
    minWidth: 'auto',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1),
  },
  box: {
    backgroundColor: '#FFFFFF00',
    width: '100%',
    borderRadius: '5px',
    padding: '1%',
  },
  activeBox: {
    backgroundColor: '#007945',
    width: '100%',
    borderRadius: '5px',
    padding: '1%',
  },
  logout: {
    // margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingRight: 10,
  },
  paper: {
    background: "#FFFFFF",
    borderColor: "#FFFFFF"
  }
});

function Navigator(props) {
  const router = useRouter()
  const { classes, ...other } = props;

  // const token = isAuthenticated()
  const token = true
  const checkPath = props.path.split('/')[1]
  // console.log(checkPath)

  const handleLogout = () => {
    logout(() => {
      router.push('/')
    })
  }

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      variant="permanent" 
      {...other}
    >
      <Box
        display='flex'
        style={{
          // margin: 'auto',
          // border: '1px solid red',
          marginTop: '10px'
        }}
      >
        <List disablePadding>
          <ListItem className={clsx(classes.header)}>
            <img width="100%" src="/logo-main.svg" alt="softkash Logo" />
          </ListItem>

          {categories.map(({ id, icon, path, activeIcon }) => (
            <React.Fragment key={id}>
              <Link href={path}>
                <a style={{ textDecoration: 'none' }}>
                  <ListItem style={{paddingLeft: '30px'}}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      className={
                        clsx(classes.box, router.pathname === props.path,
                          path === `/${checkPath}` && classes.activeBox)
                      }
                    >
                      <ListItemIcon className={classes.itemIcon}>
                        {path === `/${checkPath}` ? activeIcon : icon}
                      </ListItemIcon>

                      <ListItemText>
                        <Typography
                          className={
                            clsx(classes.item, router.pathname === props.path,
                              path === `/${checkPath}` && classes.itemActiveItem)
                          }
                        >
                          {id}
                        </Typography>
                      </ListItemText>
                    </Box>
                  </ListItem>
                </a>
              </Link>
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box
        display="flex"
        style={{
          paddingTop: 120,
          // marginTop: '40px'
        }}
      >
        <Button
          varaint="contained"
          onClick={handleLogout}
          style={{
            backgroundColor: '#007945',
            borderRadius: '6px',
            fontfamily: 'Century Gothic',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            color: '#FFFFFF',
            width: '80%',
            margin: 'auto'
          }}
        >
          <span className={classes.logout}>
            {/* <img src="/logout.svg" alt="logout" /> */}
          </span>
          {token === false ? 'LOGIN' : 'LOGOUT'}
        </Button>
      </Box>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
