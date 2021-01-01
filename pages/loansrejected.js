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
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import NumberFormat from 'react-number-format'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'

import TableLayout from '../components/Tables'
// import Graph from './../components/graph/DashboardGraph'

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


const loansRejectedData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/loans/by_status/rejected`

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

  return {
    loansRejected: data,
    isLoading: !error && !data,
    isError: error
  }
}



function LoansRejected() {
  const path = '/loansrejected'
  const classes = useStyles()

  const { loansRejected, isLoading, isError } = loansRejectedData()
  // console.log(loansRejected)

  // const users = []
  // for (let id = 1; id <= 1000; id++)
  //   for (let name of ['Peterson Frankinstine'])
  //     for (let email of ['softkash@example.com'])
  //       for (let amount of ['3,000,000'])
  //         for (let date of [moment().format('DD/MM/YYYY')])
  //           for (let status of ['Rejected'])
  //             for (let forward of ['/forward.svg'])
  //               for (let account_name of ['GTBank'])
  //                 for (let account_number of ['0125957592'])
  //                   users.push({ id, name, email, amount, date, status, forward, account_name, account_number })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // handle change per page
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // handler for pagination change per page
  const handleRowsChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
                height: '148px',
                background: '#FF0000',
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
                  marginBottom: '20px',
                  fontWeight: '400',
                  fontFamily: 'Roboto',
                  fontSize: '24px',
                  lineHeight: '28px',
                  letterSpacing: '0.1px'
                }}
              >
                {'Loans Rejected'}
              </Typography>

              {
                isError ? (<p>Try Again Please</p>)
                  : isLoading ?
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                    >
                      <CircularProgress style={{ 'color': '#FFFFFF' }} />
                    </Box> : loansRejected &&
                    <Typography
                      className={classes.box}
                      style={{
                        color: '#FFFFFF',
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'Mulish',
                        fontSize: '40px',
                        lineHeight: '18px',
                        letterSpacing: '1px'
                      }}
                    >
                      <NumberFormat
                        value={
                          loansRejected.data
                            .filter(loan => loan.status.toLowerCase() === 'rejected')
                            .map(loan => loan.amount)
                            .reduce((a, b) => a = Number(a) + Number(b), 0)

                        }
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'₦'}
                      />
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
                    Loans Rejected
                  </Typography>
                </TableCell>

                <TableCell
                  align="center"
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
                  align="center"
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
                    AMOUNT
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
                    DATE
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
                    STATUS
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                isError ? (
                  <Box 
                    display="flex" 
                    style={{
                      width: '100%',
                      margin: 'auto',
                      paddingLeft: '500px',
                      paddingRight: 100,
                      paddingTop: 150,
                      paddingBottom: 150,
                    }}
                  >
                    <p style={{color: '#FFFFFF'}}>Try Again Please</p>
                  </Box>
                )
                  : isLoading ?
                    (<Box
                      display="flex"
                      justifyContent="center"
                      style={{
                        width: '100%',
                        margin: 'auto',
                        paddingLeft: '500px',
                        paddingRight: 100,
                        paddingTop: 150,
                        paddingBottom: 150,
                      }}
                    >
                      <CircularProgress style={{ color: '#007945' }} />
                    </Box>)
                    : loansRejected &&
                    loansRejected.data
                      .filter(loan => loan.status.toLowerCase() === 'rejected')
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(user => (
                        <TableRow key={user.id}>
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
                            >
                              <Button
                                size="small"
                                variant="text"
                                disableRipple
                                className={classes.button2}
                              >
                                <img src="/forward.svg" />
                              </Button>

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
                                  {user.user.first_name}  {user.user.last_name}
                                </Typography>

                                <Typography
                                  className={classes.typography}
                                  style={{
                                    fontSize: '9px',
                                    lineHeight: '15px',
                                    color: '#283E59',
                                    fontFamily: 'Cerebri Sans',
                                    fontWeight: '400'
                                  }}
                                >
                                  {user.user.username}
                                </Typography>
                              </Box>
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
                              {user.user.email}
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
                              <NumberFormat
                                value={user.amount}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₦'}
                              />
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
                              {moment(user.created_at).format('DD/MM/YYYY')}
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
                                color: '#FF0000',
                                fontWeight: '400'
                              }}
                            >
                              {user.status}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
              }
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 20]}
            component="div"
            count={isError ? '' : isLoading ? '' : loansRejected && loansRejected.data.length}
            page={page}
            style={{ paddingRight: 30 }}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsChangePerPage}
          />
        </TableContainer>
      </Box>
    </TableLayout>
  )
}

export default LoansRejected
