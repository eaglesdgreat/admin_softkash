import React, { useState } from 'react'
import {
  Table,
  TablePagination,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { isAuthenticated } from './../lib/auth.helper'

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


const fetcher = async (...arg) => {
  // const [url, token] = arg
  const [url] = arg

  const response = await axios.get(
    url,
    // { headers: { authenticate: token } }
  )

  return response.data
}


const adminsData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/admins`

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

  return {
    admins: data,
    isLoading: !error && !data,
    isError: error
  }
}



function ModulePermission() {
  const path = '/modulepermission'
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar();

  const [{ adminsResult }, dispatch] = useStateValue();

  const { admins, isLoading, isError } = adminsData()
  // console.log(admins)

  // const users = []
  // for (let id = 1; id <= 500; id++)
  //   for (let name of ['Peterson Frankinstine'])
  //     for (let email of ['softkash@example.com'])
  //       for (let phone of ['07033390533'])
  //         for (let role of ['Super Admin', 'Admin'])
  //           users.push({ id, name, email, phone, role })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [open, setOpen] = useState(false)
  const [adminDetails, setAdminDetails] = useState({})
  const [loading, setLoading] = useState(false);

  // handle change per page
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  // console.log(adminsResult)

  // handler for pagination change per page
  const handleRowsChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // click open dialog pop up
  const handleDialogClick = () => {
    setOpen(true)
  }

  // handle dialog close changes
  const handleDialogClose = () => {
    setOpen(false)
  }

  // block admin handler 
  const handleBlockAdmin = async (e) => {
    e.preventDefault()

    // const token = isAuthenticated().authToken

    const url = adminDetails.blockType === 0
      ? `${process.env.BACKEND_URL}/api/disable/admin_users/${adminDetails.adminId}`
      : `${process.env.BACKEND_URL}/api/enable/admin_users/${adminDetails.adminId}`

    const mutateUrl = `${process.env.BACKEND_URL}/api/admins`

    const num = admins.data.findIndex(o => o.id === adminDetails.adminId)

    setLoading(true);

    try {
      // const response = { data: { body, success: 'You have successfully delected the product' } }
      // console.log(response.data.body)
      const response = await axios.post(
        url,
        // { headers: { authenticate: token } }
      )
      console.log(response.data)

      if (response.data) {
        // swr globla mutate methode for changing data in cache without revalidating 
        mutate(mutateUrl, async () => {
          let updatedOrders = admins.data
          const mutateBlock = adminDetails.blockType === 0 ? 1 : 0

          updatedOrders[num] = { ...updatedOrders[num],  lock: mutateBlock }

          // console.log(updatedOrders[id - 1])

          return updatedOrders
        }, false)

        setLoading(false);

        handleDialogClose()

        enqueueSnackbar(`${response.data.Response_message}`, {
          variant: 'success',
        });
      }
    } catch (e) {
      console.log(e.response)

      setLoading(false);

      if (e.response) {
        enqueueSnackbar(`${e.response.data.message}. Try again`, {
          variant: 'error',
        });
      }
    }
  }

  return (
    <TableLayout path={path}>
      <Box
        display="flex"
        style={{
          marginTop: '5px',
          marginBottom: '15px'
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <Box
              display="flex"
              flexDirection="column"
              style={{
                width: '100%',
                height: '160px',
                background: '#000060',
                borderRadius: '13px',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '30px',
                paddingRight: '20px',
              }}
            >
              <Typography
                className={classes.box}
                style={{
                  color: '#FFFFFF',
                  marginBottom: '25px',
                  fontWeight: '700',
                  fontFamily: 'Century Gothic',
                  fontSize: '24px',
                  lineHeight: '28px',
                  letterSpacing: '0.1px',
                  fontStyle: 'normal',
                }}
              >
                {'Module Permission Role'}
              </Typography>

              {
                isError ? (<p>Try Again Please</p>)
                  : isLoading ?
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      style={{
                        // margin: 'auto',
                        // paddingLeft: 100,
                        // paddingRight: 100,
                        // paddingTop: 150,
                        // paddingBottom: 150,
                      }}
                    >
                      <CircularProgress style={{ 'color': '#FFFFFF' }} />
                    </Box> : admins &&
                    <Typography
                      className={classes.box}
                      style={{
                        color: '#FFFFFF',
                        marginBottom: '20px',
                        fontWeight: 'normal',
                        fontFamily: 'Century Gothic',
                        fontSize: '36px',
                        lineHeight: '28px',
                        letterSpacing: '0.1px',
                        fontStyle: 'normal',
                      }}
                    >
                      {(adminsResult.length < 1 ? admins.data.length : adminsResult.length)}
                    </Typography>
              }
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.box2}>
        <TableContainer className={classes.tContainer} component="div">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  size="medium"
                  variant="head"
                >
                  <Typography
                    className={classes.typography}
                    style={{
                      fontFamily: 'Cerebri Sans',
                      fontSize: '36px',
                      lineHeight: '46px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Module Permission
                  </Typography>
                </TableCell>

                <TableCell
                  align="right"
                  size="medium"
                  variant="head"
                >
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    style={{
                      width: '100%',
                      paddingRight: '20px',
                    }}
                  >
                    <Button
                      variant="text"
                      className={classes.button2}
                      disableRipple
                      size="small"
                    >
                      <Typography
                        style={{
                          fontSize: '14px',
                          lineHeight: '28px',
                          color: '#007945',
                          fontWeight: '500',
                          letterSpacing: '0.1px',
                          fontFamily: 'Roboto',
                          fontStyle: 'normal'
                        }}
                      >
                        Sort by
                      </Typography>
                    </Button>
                  </Box>
                </TableCell>

                <TableCell
                  align="left"
                  size="medium"
                  variant="head"
                >
                  <Button
                    variant="text"
                    className={classes.button}
                    disableRipple
                    size="small"
                  >
                    <Typography
                      className={classes.typography}
                      style={{
                        fontSize: '13px',
                        lineHeight: '21px',
                        color: '#12263F',
                        fontWeight: '400',
                      }}
                    >
                      View All
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>

          {
            isError ? (<p>Try Again Please</p>)
              : isLoading ?
                <Box
                  display="flex"
                  justifyContent="center"
                  style={{
                    width: '100%',
                    margin: 'auto',
                    paddingLeft: 100,
                    paddingRight: 100,
                    paddingTop: 150,
                    paddingBottom: 150,
                  }}
                >
                  <CircularProgress style={{ 'color': '#007945' }} />
                </Box> : admins &&

                <Table>
                  <TableHead>
                    <TableRow style={{ background: 'rgba(249, 250, 252, 0.5)' }}>
                      <TableCell
                        size="small"
                        className={classes.tableCell}
                      >
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '12px',
                            lineHeight: '15px',
                            color: '#95AAC9',
                            letterSpacing: '0.08em',
                          }}
                        >
                          S/N
                        </Typography>
                      </TableCell>

                      <TableCell
                        align="left"
                        size="small"
                        className={classes.tableCell}
                      >
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '12px',
                            lineHeight: '15px',
                            color: '#95AAC9',
                            letterSpacing: '0.08em',
                          }}
                        >
                          NAME
                        </Typography>
                      </TableCell>

                      <TableCell
                        className={classes.tableCell}
                      >
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '12px',
                            lineHeight: '15px',
                            color: '#95AAC9',
                            letterSpacing: '0.08em',
                          }}
                        >
                          EMAIL ADDRESS
                        </Typography>
                      </TableCell>

                      <TableCell
                        className={classes.tableCell}
                      >
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '12px',
                            lineHeight: '15px',
                            color: '#95AAC9',
                            letterSpacing: '0.08em',
                          }}
                        >
                          PHONE NO
                        </Typography>
                      </TableCell>

                      <TableCell
                        className={classes.tableCell}
                      >
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '12px',
                            lineHeight: '15px',
                            color: '#95AAC9',
                            letterSpacing: '0.08em',
                          }}
                        >
                          ROLE
                        </Typography>
                      </TableCell>

                      {
                        isAuthenticated().role_name.toLowerCase() === 'super admin'
                          ? <TableCell className={classes.tableCell}></TableCell> : ''
                      }
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      (adminsResult.length < 1 ? admins.data : adminsResult)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((user, i) => (
                          <TableRow key={i}>
                            <TableCell
                              className={classes.tableCell}
                            >
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: '15px',
                                  lineHeight: '165.1%',
                                  color: '#283E59',
                                  fontFamily: 'Cerebri Sans',
                                  fontWeight: '400'
                                }}
                              >
                                {user.id}
                              </Typography>
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                            >
                              <Box
                                display="flex"
                                flexDirection="column"
                                style={{
                                  // marginLeft: '10px'
                                }}
                              >
                                <Typography
                                  className={classes.typography}
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: '165.1%',
                                    marginBottom: '5px',
                                    color: '#283E59',
                                    fontFamily: 'Cerebri Sans',
                                    fontWeight: '400'
                                  }}
                                >
                                  {user.first_name} {user.last_name}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                            >
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: '15px',
                                  lineHeight: '165.1%',
                                  color: '#283E59',
                                  fontFamily: 'Cerebri Sans',
                                  fontWeight: '400'
                                }}
                              >
                                {user.email}
                              </Typography>
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                            >
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: '15px',
                                  lineHeight: '165.1%',
                                  color: '#283E59',
                                  fontFamily: 'Cerebri Sans',
                                  fontWeight: '400'
                                }}
                              >
                                {user.phone_number}
                              </Typography>
                            </TableCell>

                            <TableCell
                              className={classes.tableCell}
                            >
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: '15px',
                                  lineHeight: '165.1%',
                                  color: '#283E59',
                                  fontFamily: 'Cerebri Sans',
                                  fontWeight: '400'
                                }}
                              >
                                {user.role_name}
                              </Typography>
                            </TableCell>

                            {
                              isAuthenticated().role_name.toLowerCase() === 'super admin'
                                ? <TableCell>
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    style={{
                                      // border: '1px solid #EAEAEA',
                                      // borderRadius: '2px',
                                      width: '100%',
                                      // margin: 'auto',
                                      // backgroundColor: 'rgba(255, 92, 0, 0.08)'
                                    }}
                                  >
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      className={clsx(classes.typography, classes.button2)}
                                      style={{
                                        fontWeight: '450',
                                        fontSize: '13px',
                                        color: '#EAEAEA',
                                        lineHeight: '15px',
                                        borderRadius: '3px',

                                      }}
                                      onClick={
                                        () => {
                                          handleDialogClick()
                                          setAdminDetails({
                                            adminId: user.id,
                                            name: `${user.first_name} ${user.last_name}`,
                                            blockType: user.lock,
                                          })
                                        }
                                      }
                                    >
                                      {user.lock === 0 ? 'BLOCK' : 'UNBLOCK'}
                                    </Button>
                                  </Box>
                                  <Dialog
                                    open={open}
                                    onClose={handleDialogClose}
                                    BackdropProps={{
                                      style: {
                                        opacity: .3
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
                                        Block Admin User
                                      </Typography>
                                    </DialogTitle>

                                    <DialogContent>
                                      <Box
                                        display="flex"
                                        component="span"
                                        style={{
                                          whiteSpace: 'initial',
                                        }}
                                      >
                                        <Typography
                                          className={classes.typography}
                                          style={{
                                            fontWeight: 'normal',
                                            fontSize: '15px',
                                            lineHeight: '22px',
                                            color: '#242120',
                                          }}
                                        >
                                          {
                                            adminDetails.blockType === 0 ?
                                              `Are you sure you want to block "${adminDetails.name}"
                                          from accessing the admin platform?. You can cancel or click on the block
                                          button to block this admin user.`

                                              : `You are about to unblock "${adminDetails.name}"
                                                and give him access to the admin platform again`
                                          }
                                        </Typography>
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
                                          className={classes.button2}
                                          onClick={handleBlockAdmin}
                                          disableRipple
                                          style={{
                                            border: '2px solid #007945',
                                          }}
                                        >
                                          {
                                            loading
                                              ? <CircularProgress size="2em" style={{ color: '#007945' }} /> :
                                              <Typography
                                                className={classes.typography}
                                                style={{
                                                  textAlign: 'center',
                                                  color: '#007945',
                                                  fontSize: '13px',
                                                  fontWeight: '500',
                                                  lineHeight: '15px',
                                                  textTransform: 'uppercase',
                                                  lineSpacing: '0.02em'
                                                }}
                                              >
                                                {adminDetails.blockType === 0 ? 'block' : 'unblock'}
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
                                </TableCell> : ''
                            }
                          </TableRow>
                        ))
                    }
                  </TableBody>
                </Table>
          }
          {
            isError ? ''
              : isLoading ? '' : admins &&
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10, 20]}
                  component="div"
                  count={(adminsResult.length < 1 ? admins.data.length : adminsResult.length)}
                  page={page}
                  style={{ paddingRight: 30 }}
                  onChangePage={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={handleRowsChangePerPage}
                />
          }
        </TableContainer>
      </Box>
    </TableLayout >
  )
}

export default ModulePermission
