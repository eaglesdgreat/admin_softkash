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
  Divider,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'
import NumberFormat from 'react-number-format'

import TableLayout from '../components/Tables'
import Graph from '../components/graph/BarChart'
import { useStateValue } from '../StateProviders';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    display: 'flex',
  },
  table: {
    width: '90%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  typography: {
    fontFamily: 'Cerebri Sans',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '36px',
    lineHeight: '46px',
    letterSpacing: '-1%',
    color: '#007945',
  },
  search: {
    border: '1px solid #EAEAEA',
    borderRadius: '6px'
  },
  tableCell: {
    // borderBottom: 'none',
    // width: '100%',
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
  box: {
    paddingRight: 30,
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


const activeLoansData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/loans`

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

  return {
    activeLoans: data,
    isLoading: !error && !data,
    isError: error
  }
}



function ActiveLoansList() {
  const path = '/activeloanslist'
  const classes = useStyles()

  const [{ activeLoansResult }, dispatch] = useStateValue();

  // const users = []
  // for (let id = 1; id <= 1000; id++)
  //   for (let name of ['Peterson Frankinstine'])
  //     for (let email of ['softkash@example.com'])
  //       for (let amount of ['3,000,000'])
  //         for (let date of [moment().format('DD/MM/YYYY')])
  //           for (let time of [moment().format('hh:mm a')])
  //             users.push({ id, name, email, amount, date, time })

  const { activeLoans, isLoading, isError } = activeLoansData()
  // console.log(activeLoans)

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
  // console.log(activeLoansResult)


  // This function calculate the data for a calender year (e.g 2020)
  // and place the data in the graph (num of orders against month)
  const onYearlyChangeActiveLoans = () => {
    const year = moment().format('YYYY')

    const newDate = []
    let data = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December']

    let items =
      (activeLoansResult.length < 1 ? activeLoans.data.data : activeLoansResult)
        .filter(loan => loan.status.toLowerCase() === 'running' || loan.status.toLowerCase() === 'paid')
        .filter(x => {
          const check = moment(x.created_at).format('YYYY').toString() === year;
          // console.log(moment(x.createdAt).format('MMMM'))
          return check
        })
    // console.log(items)

    for (let count = 0; count < 12; count++) {
      let item = items.filter(x => moment(x.created_at).format('MMMM') === data[0])
        .map(amount => amount.amount).reduce((a, b) => a = Number(a) + Number(b), 0)
      // console.log(item)

      newDate.push(item)

      // Remove the first element of the array and reassign data to be the new array
      data.shift()
      data = data
      // console.log(data)
    }

    return newDate
  }


  const onYearlyChangeActiveAmount = () => {
    const year = moment().format('YYYY')

    const newDate = []
    let data = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December']

    let items =
      (activeLoansResult.length < 1 ? activeLoans.data.data : activeLoansResult)
        .filter(loan => loan.status.toLowerCase() === 'un-paid' || loan.status.toLowerCase() === 'overdue')
        .filter(x => {
          const check = moment(x.created_at).format('YYYY').toString() === year;
          // console.log(moment(x.createdAt).format('MMMM'))
          return check
        })
    // console.log(items)

    for (let count = 0; count < 12; count++) {
      let item = items.filter(x => moment(x.created_at).format('MMMM') === data[0])
        .map(amount => amount.amount).reduce((a, b) => a = Number(a) + Number(b), 0)
      // console.log(item)

      newDate.push(item)

      // Remove the first element of the array and reassign data to be the new array
      data.shift()
      data = data
      // console.log(data)
    }

    return newDate
  }

  // if (activeLoansResult.length > 0) {
  //   setPage(0)
  // }

  return (
    <TableLayout path={path}>
      <Box className={classes.box}>
        <TableContainer className={classes.tContainer} component="div">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" size="medium" variant="head">
                  <Typography
                    className={classes.typography}
                    style={{
                      fontFamily: "Cerebri Sans",
                      fontSize: "36px",
                      lineHeight: "46px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Active Loans List
                  </Typography>
                </TableCell>

                <TableCell align="center" size="medium" variant="head">
                  <Button
                    variant="text"
                    className={classes.button}
                    disableRipple
                    size="small"
                  >
                    <Typography
                      className={classes.typography}
                      style={{
                        fontSize: "13px",
                        lineHeight: "21px",
                        color: "#12263F",
                        fontWeight: "400",
                      }}
                    >
                      View All
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>

          {isError ? (
            <Box display="flex" style={{ margin: "auto" }}>
              <p>Try Again Please</p>
            </Box>
          ) : isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              style={{
                width: "100%",
                margin: "auto",
                paddingLeft: 100,
                paddingRight: 100,
                paddingTop: 150,
                paddingBottom: 150,
              }}
            >
              <CircularProgress style={{ color: "#007945" }} />
            </Box>
          ) : (
            activeLoans && (
              <Table>
                <TableHead>
                  <TableRow style={{ background: "rgba(249, 250, 252, 0.5)" }}>
                    <TableCell size="small" className={classes.tableCell}>
                      <Typography
                        className={classes.typography}
                        style={{
                          fontSize: "12px",
                          lineHeight: "15px",
                          color: "#95AAC9",
                          letterSpacing: "0.08em",
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
                          fontSize: "12px",
                          lineHeight: "15px",
                          color: "#95AAC9",
                          letterSpacing: "0.08em",
                        }}
                      >
                        NAME
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      <Typography
                        className={classes.typography}
                        style={{
                          fontSize: "12px",
                          lineHeight: "15px",
                          color: "#95AAC9",
                          letterSpacing: "0.08em",
                        }}
                      >
                        EMAIL ADDRESS
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      <Typography
                        className={classes.typography}
                        style={{
                          fontSize: "12px",
                          lineHeight: "15px",
                          color: "#95AAC9",
                          letterSpacing: "0.08em",
                        }}
                      >
                        AMOUNT
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      <Typography
                        className={classes.typography}
                        style={{
                          fontSize: "12px",
                          lineHeight: "15px",
                          color: "#95AAC9",
                          letterSpacing: "0.08em",
                        }}
                      >
                        DATE
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.tableCell}>
                      <Typography
                        className={classes.typography}
                        style={{
                          fontSize: "12px",
                          lineHeight: "15px",
                          color: "#95AAC9",
                          letterSpacing: "0.08em",
                        }}
                      >
                        STATUS
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(activeLoansResult.length < 1
                    ? activeLoans.data.data
                    : activeLoansResult
                  )
                    .filter(
                      (loan) =>
                        loan.status.toLowerCase() === "running" ||
                        loan.status.toLowerCase() === "paid" ||
                        loan.status.toLowerCase() === "un-paid" ||
                        loan.status.toLowerCase() === "overdue"
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, i) => (
                      <TableRow key={user.id}>
                        <TableCell className={classes.tableCell}>
                          <Link href={"/loans/[view]?type='activeloan'"} as={`/loans/${user.id}?type='activeloan'`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontWeight: "400",
                                }}
                              >
                                {i + 1}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          <Link href={"/loans/[view]?type='activeloan'"} as={`/loans/${user.id}?type='activeloan'`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontWeight: "400",
                                }}
                              >
                                {user.user ? user.user.first_name : "User"}{" "}
                                {user.user ? user.user.last_name : "User"}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          <Link href={"/loans/[view]?type='activeloan'"} as={`/loans/${user.id}?type='activeloan'`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontWeight: "400",
                                }}
                              >
                                {user.user ? user.user.email : "Email"}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          <Link href={"/loans/[view]?type='activeloan'"} as={`/loans/${user.id}?type='activeloan'`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontWeight: "400",
                                }}
                              >
                                <NumberFormat
                                  value={user.amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₦"}
                                />
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          <Link href={"/loans/[view]?type='activeloan'"} as={`/loans/${user.id}?type='activeloan'`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontWeight: "400",
                                }}
                              >
                                {moment(user.created_at).format("DD/MM/YYYY")}
                              </Typography>

                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontWeight: "400",
                                }}
                              >
                                {moment(user.created_at).format("hh:mm a")}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          <Link href={"/loans/[view]?type='activeloan'"} as={`/loans/${user.id}?type='activeloan'?type='activeloan'`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontWeight: "400",
                                }}
                              >
                                {user.status}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )
          )}
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 20]}
            component="div"
            count={
              isError
                ? 0
                : isLoading
                ? 0
                : activeLoans &&
                  (activeLoansResult.length < 1
                    ? activeLoans.data.data
                    : activeLoansResult
                  ).filter(
                    (loan) =>
                      loan.status.toLowerCase() === "running" ||
                      loan.status.toLowerCase() === "paid" ||
                      loan.status.toLowerCase() === "un-paid" ||
                      loan.status.toLowerCase() === "overdue"
                  ).length
            }
            page={page}
            style={{ paddingRight: 30 }}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsChangePerPage}
          />
        </TableContainer>
      </Box>

      <Box
        diaplay="flex"
        style={{
          paddingTop: "30px",
          width: "100%",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          style={{
            background: "#ffffff",
            width: "96%",
            border: "1px solid #E4EBF6",
            borderRadius: "10px",
          }}
        >
          <Box
            display="flex"
            // justifyContent="flex-start"
            style={{
              background: "#ffffff",
              // borderRadius: '10px',
              width: "96%",
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingBottom: "20px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Cerebri Sans",
                fontSize: "24px",
                fontWeight: "600",
                lineHeight: "30.48px",
                fontStyle: "normal",
                letterSpacing: "-1%",
                color: "#007945",
              }}
            >
              Active Loans Stats
            </Typography>

            <Box
              display="flex"
              justifyContent="flex-end"
              style={{
                width: "69%",
              }}
            >
              <Box display="flex" justifyContent="flex-end">
                <Typography
                  style={{
                    fontFamily: "Cerebri Sans",
                    fontWeight: "400",
                    fontSize: "13px",
                    lineHeight: "21px",
                    letterSpacing: "-0.01em",
                    color: "#95AAC9",
                  }}
                >
                  Active Loans Per Month
                </Typography>

                <Box
                  display="flex"
                  component="span"
                  style={{
                    marginLeft: "7px",
                    width: "25px",
                    height: "25px",
                    background: "#007945",
                  }}
                ></Box>
              </Box>

              <Box
                display="flex"
                justifyContent="flex-end"
                style={{
                  paddingLeft: "30px",
                }}
              >
                <Typography
                  style={{
                    fontFamily: "Cerebri Sans",
                    fontWeight: "400",
                    fontSize: "13px",
                    lineHeight: "21px",
                    letterSpacing: "-0.01em",
                    color: "#95AAC9",
                  }}
                >
                  Inavtive Loans Per Month
                </Typography>

                <Box
                  display="flex"
                  component="span"
                  style={{
                    marginLeft: "7px",
                    width: "25px",
                    height: "25px",
                    background: "#D2DDEC",
                  }}
                ></Box>
              </Box>
            </Box>
          </Box>

          <Divider style={{ border: "1px solid #EDF2F9" }} />

          <Graph
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  label: "Active Loans Amount Per Month",
                  backgroundColor: "#007945",
                  borderColor: "#007945",
                  borderWidth: 1,
                  borderRadius: "50px",
                  data: [65, 59, 80, 81, 56, 55, 40, 56, 70, 90, 78, 45],
                  // data: onYearlyChangeActiveLoans()
                },

                {
                  label: "Inavtive Loans Per Month",
                  backgroundColor: "#D2DDEC",
                  borderColor: "#D2DDEC",
                  borderWidth: 1,
                  borderRadius: "50px",
                  data: [45, 79, 50, 41, 16, 85, 20, 45, 67, 89, 90, 67],
                  // data: onYearlyChangeActiveAmount()
                },
              ],
            }}
          />
        </Box>
      </Box>
    </TableLayout>
  );
}

export default ActiveLoansList