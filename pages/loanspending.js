import React, { useState } from "react";
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
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

import TableLayout from "./../components/Tables";
import { useStateValue } from "../StateProviders";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgba(0, 121, 69, 0.05)",
    borderRadius: "25px",
  },
  typography: {
    fontFamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "28px",
    letterSpacing: "-1%",
    color: "#007945",
  },
  box: {
    fontFamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
  },
  button: {
    "&:hover,&:focus": {
      backgroundColor: "#ffffff00",
    },
    border: "1px solid #E4EBF6",
    borderRadius: "4px",
  },
  tContainer: {
    border: "1px solid #E4EBF6",
    borderRadius: "10px",
    background: "#FFFFFF",
  },
  box2: {
    paddingRight: 20,
    width: "100%",
    display: "flex",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const fetcher = async (...arg) => {
  // const [url, token] = arg
  const [url] = arg;

  const response = await axios.get(
    url
    // { headers: { authenticate: token } }
  );

  return response.data;
};

const loansPendingData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/loans`;

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false });

  return {
    loansPending: data,
    isLoading: !error && !data,
    isError: error,
  };
};

function LoansPending() {
  const path = "/loanspending";
  const classes = useStyles();

  const [{ pendingApprovedLoans }, dispatch] = useStateValue();

  // const users = []
  // for (let id = 1; id <= 1000; id++)
  //   for (let name of ['Peterson Frankinstine'])
  //     for (let email of ['softkash@example.com'])
  //       for (let amount of ['3,000,000'])
  //         for (let date of [moment().format('DD/MM/YYYY')])
  //           for (let status of [(id / 2 === 0) ? 'active' : 'pending'])
  //             users.push({ id, name, email, amount, date, status })

  const { loansPending, isLoading, isError } = loansPendingData();
  // console.log(loansPending)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // handle change per page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handler for pagination change per page
  const handleRowsChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // console.log(pendingApprovedLoans)

  const gridBoxes = [
    {
      color: "#FFFFFF",
      text: "Approved Loans",
      background: "#007945",
      amount: isError ? (
        ""
      ) : isLoading ? (
        <Box display="flex" justifyContent="flex-start" component="span">
          <CircularProgress style={{ color: "#FFFFFF" }} />
        </Box>
      ) : (
        <NumberFormat
          value={(pendingApprovedLoans.length < 1
            ? loansPending.data.data
            : pendingApprovedLoans
          )
            .filter((loan) => loan.status.toLowerCase() === "approved")
            .map((loan) => loan.amount)
            .reduce((a, b) => (a = Number(a) + Number(b)), 0)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      ),
      // smallText: 'Payment due on 20/12/2020'
    },
    {
      color: "#FFFFFF",
      text: "Pending Loans",
      background: "#007945",
      amount: isError ? (
        ""
      ) : isLoading ? (
        <Box display="flex" justifyContent="flex-start" component="span">
          <CircularProgress style={{ color: "#FFFFFF" }} />
        </Box>
      ) : (
        <NumberFormat
          value={(pendingApprovedLoans.length < 1
            ? loansPending.data.data
            : pendingApprovedLoans
          )
            .filter((loan) => loan.status.toLowerCase() === "pending")
            .map((loan) => loan.amount)
            .reduce((a, b) => (a = Number(a) + Number(b)), 0)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₦"}
        />
      ),
      // smallText: 'To be approved on 20/12/2020'
    },
  ];

  return (
    <TableLayout path={path}>
      <Box
        display="flex"
        style={{
          marginTop: "5px",
          marginBottom: "15px",
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {gridBoxes.map((box, i) => (
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} key={i}>
              <Box
                display="flex"
                flexDirection="column"
                style={{
                  width: "100%",
                  height: "148px",
                  background: box.background,
                  borderRadius: "13px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "30px",
                  paddingRight: "20px",
                }}
              >
                <Typography
                  className={classes.box}
                  style={{
                    color: box.color,
                    marginBottom: "35px",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                    fontSize: "24px",
                    lineHeight: "28px",
                    letterSpacing: "0.1px",
                  }}
                >
                  {box.text}
                </Typography>

                {isLoading ? (
                  <Box display="flex">{box.amount}</Box>
                ) : (
                  <Typography
                    className={classes.box}
                    style={{
                      color: box.color,
                      marginBottom: "20px",
                      fontWeight: "bold",
                      fontFamily: "Mulish",
                      fontSize: "40px",
                      lineHeight: "18px",
                      letterSpacing: "0.1px",
                    }}
                  >
                    {box.amount}
                  </Typography>
                )}

                {/* <Typography
                    className={classes.box}
                    style={{
                      color: box.color,
                      fontWeight: '400',
                      fontFamily: 'Century Gothic',
                      fontSize: '12px',
                      lineHeight: '28px',
                      letterSpacing: '0.1px'
                    }}
                  >
                    {box.smallText}
                  </Typography> */}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className={classes.box2}>
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
                    Loans Pending Approval
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
            loansPending && (
              <Table>
                <TableHead>
                  <TableRow style={{ background: "rgba(249, 250, 252, 0.5)" }}>
                    <TableCell
                      size="small"
                      align="left"
                      style={{
                        // wordWrap: "initial",
                        maxWidth: "50px",
                      }}
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
                        S/N
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="left"
                      size="small"
                      style={{
                        // wordWrap: "initial",
                        maxWidth: "50px",
                      }}
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

                    <TableCell>
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

                    <TableCell>
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

                    <TableCell>
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

                    <TableCell>
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
                  {(pendingApprovedLoans.length < 1
                    ? loansPending.data.data
                    : pendingApprovedLoans
                  )
                    .filter(
                      (loan) =>
                        loan.status.toLowerCase() === "pending" ||
                        loan.status.toLowerCase() === "approved"
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, i) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Link href={"/loans/[view]"} as={`/loans/${user.id}`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontFamily: "Cerebri Sans",
                                  fontWeight: "400",
                                }}
                              >
                                {i + 1}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell>
                          <Link href={"/loans/[view]"} as={`/loans/${user.id}`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontFamily: "Cerebri Sans",
                                  fontWeight: "400",
                                }}
                              >
                                {user.user.first_name} {user.user.last_name}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell>
                          <Link href={"/loans/[view]"} as={`/loans/${user.id}`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontFamily: "Cerebri Sans",
                                  fontWeight: "400",
                                }}
                              >
                                {user.user.email}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell>
                          <Link href={"/loans/[view]"} as={`/loans/${user.id}`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontFamily: "Cerebri Sans",
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

                        <TableCell>
                          <Link href={"/loans/[view]"} as={`/loans/${user.id}`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontFamily: "Cerebri Sans",
                                  fontWeight: "400",
                                }}
                              >
                                {moment(user.created_at).format("DD/MM/YYYY")}
                              </Typography>
                            </a>
                          </Link>
                        </TableCell>

                        <TableCell>
                          <Link href={"/loans/[view]"} as={`/loans/${user.id}`}>
                            <a style={{ textDecoration: "none" }}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  fontSize: "15px",
                                  lineHeight: "165.1%",
                                  color: "#283E59",
                                  fontFamily: "Cerebri Sans",
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
                : loansPending &&
                  (pendingApprovedLoans.length < 1
                    ? loansPending.data.data
                    : pendingApprovedLoans
                  ).filter(
                    (loan) =>
                      loan.status.toLowerCase() === "pending" ||
                      loan.status.toLowerCase() === "approved"
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
    </TableLayout>
  );
}

export default LoansPending;
