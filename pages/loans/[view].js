import React, { Fragment, useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import { ArrowBackIos, EditOutlined } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
// import ReactLoading from "react-loading";
// import moment from "moment";
// import NumberFormat from "react-number-format";

import TableLayout from "./../../components/Tables";
// import { isAuthenticated } from '../../../lib/auth.helper'
// import PrivateRoute from './../../../Components/PrivateRoute'
// import Switch from '../../../Components/Switch';

// CSS Styles
const useStyles = makeStyles(() => ({
  container: {
    margin: "0 auto",
    padding: "2rem 2rem 6rem 2rem",
  },
  backEditWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  back: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    // marginBottom: "1rem",
  },
  edit: {
    background: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    width: "7rem",
    marginLeft: "1.5rem",
  },
  status: {
    color: "#007945",
    marginTop: "0.2rem",
    display: "flex",
    justifyContent: "center",
    AlignItems: "center",
    marginBottom: "1rem",
    borderRadius: "6px",
    background: "#FFF2EB",
    width: "8rem",
  },
  boxDisplay: {
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  boxRight: {
    display: "flex",
    padding: "2rem",
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  tableInfo: {
    color: "#272643",
    fontSize: "1rem",
  },
  backgroundOrange: {
    background: "rgba(255, 92, 1, 0.08)",
  },
  switchFontSize: {
    fontSize: "0.8rem",
  },
  buttonHover: {
    "&:hover,&:focus": {
      backgroundColor: "#ffffff00",
    },
  },
}));


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FFFFFF",
    color: "#252525",
    borderBottom: "none",
  },
  body: {
    fontSize: 14,
    borderBottom: "none",
  },
}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFFFFF",
    },
    "&:hover": {
      background: "#F4F6F7",
    },
    cursor: "pointer",
    transition: "all 0.3s ease-in-out 0s",
  },
}))(TableRow);



const fetcher = async (...arg) => {
  const [url, token] = arg;

  // const {url, token} = arg

  const response = await axios.get(url, { headers: { authenticate: token } });

  return response.data;
};



const loanData = () => {
  const router = useRouter();
  const { view } = router.query;

  const url = `${process.env.BACKEND_URL}/api/loans/${view}`;

  // const token = isAuthenticated().authToken;

  const { data, error } = useSWR([url], fetcher);

  return {
    loan: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default function View() {
  const path = "/loanspending";
  const classes = useStyles();
  const router = useRouter();
  const { view } = router.query;

  // Fetching data from backend with SWR
  const { loan, isLoading, isError } = loanData();
  console.log(loan.data[0])

  return (
    <TableLayout path={path}>
      <Box className={classes.container}>
        <Box className={classes.backEditWrapper}>
          <span className={classes.back}>
            <Button
              size="large"
              className={classes.buttonHover}
              disableRipple
              onClick={() => router.back()}
            >
              <ArrowBackIos style={{ fontSize: "0.8rem" }} />
              <Typography style={{ fontSize: "0.8rem" }}>BACK</Typography>
            </Button>
          </span>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <Link href={"/loans/[edit]"} as={`/loans/${view}`}> */}
            {/* <span className={classes.edit}> */}
            <Button size="large" className={classes.buttonHover} disableRipple>
              <EditOutlined
                style={{
                  fontSize: "0.9rem",
                  color: "#007945",
                  marginRight: "0.3rem",
                }}
              />
              <Typography
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#007945",
                }}
              >
                update status
              </Typography>
            </Button>
            {/* </span>
            </Link> */}
          </Box>
        </Box>

        {isError ? (
          <PrivateRoute isError={isError} />
        ) : isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            style={{
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
          loan.data && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                <Box
                  style={{ marginBottom: "1rem" }}
                  className={classes.boxDisplay}
                >
                  <Box
                    style={{
                      background: "#007945",
                      borderRadius: "4px 4px 0 0",
                      padding: "1rem 1rem",
                    }}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Typography
                        style={{
                          fontWeight: 600,
                          color: "#FFFFFF",
                          fontSize: "1.2rem",
                        }}
                      >
                        {loan.data[0].user.first_name}{" "}
                        {loan.data[0].user.last_name}
                      </Typography>

                      <Typography
                        style={{
                          fontWeight: 600,
                          color: "#FFFFFF",
                          fontSize: "1.2rem",
                        }}
                      >
                        {loan.data[0].user.username}
                      </Typography>
                    </Box>
                    {/* <Typography
                      style={{
                        fontWeight: 600,
                        color: "#FFFFFF",
                        fontSize: "1.2rem",
                      }}
                    >
                      {loan.data[0].user.first_name}{" "}
                      {loan.data[0].user.last_name}
                    </Typography> */}

                    <Box className={classes.status}>
                      {loan.data[0].status.toLowerCase() === "approved" ? (
                        <Box className={classes.status}>
                          <img
                            src="/check-circle.svg"
                            style={{ marginRight: "0.5rem" }}
                          />
                          <Typography
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 500,
                              padding: "0.5rem 0",
                            }}
                          >
                            {loan.data[0].status.toUpperCase()}
                          </Typography>
                        </Box>
                      ) : (
                        <Box className={classes.status}>
                          <Typography
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: 500,
                              padding: "0.5rem 0",
                            }}
                          >
                            {loan.data[0].status.toUpperCase()}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box
                    style={{
                      padding: "1rem 2rem 1rem 1rem",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Typography style={{ color: "#6A6A6A" }}>
                      Contact Info
                    </Typography>

                    <Typography>{loan.data[0].user.email}</Typography>

                    <Typography style={{ fontWeight: "500" }}>
                      {loan.data[0].user.phone_number}
                    </Typography>

                    <Box style={{ marginTop: "1rem" }}>
                      <Typography
                        style={{ color: "#6A6A6A", marginBottom: "0.4rem" }}
                      >
                        Address
                      </Typography>

                      <Typography>
                        {loan.data[0].user.address}
                        {/* {user.user.city}, {user.user.state} */}
                      </Typography>
                    </Box>

                    <Box
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <Typography
                        style={{
                          color: "#6A6A6A",
                        }}
                      >
                        Business Type
                      </Typography>

                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          // alignItems: "center",
                          marginBottom: "2rem",
                        }}
                      >
                        <Typography
                          // key={i}
                          style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                            textTransform: "uppercase",
                          }}
                        >
                          {loan.data.type_of_business
                            ? loan.data.type_of_business
                            : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box
                  style={{ padding: "1rem", backgroundColor: "#FFFFFF" }}
                  className={classes.boxDisplay}
                >
                  <Typography>Start Date - End date</Typography>
                  <Typography>
                    {loan.data[0].start_date
                      ? moment(loan.data[0].start_date).format("YYYY MMM DD")
                      : ""}
                    {" "}
                    {loan.data[0].end_date
                      ? moment(loan.data[0].end_date).format("YYYY MMM DD")
                      : ""}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                <Box
                  style={{
                    height: "100%",
                    flexDirection: "column",
                    backgroundColor: "#FFFFFF",
                  }}
                  className={classes.boxRight}
                >
                  <Box style={{ marginBottom: "1.5rem" }}>
                    <Typography style={{ color: "#6A6A6A" }}>
                      Account Number
                    </Typography>

                    <Typography
                      style={{
                        padding: "0.15rem 0",
                        color: "#242120",
                      }}
                    >
                      {loan.data[0].account_number}
                    </Typography>
                  </Box>

                  <Box style={{ marginBottom: "1.5rem" }}>
                    <Typography style={{ color: "#6A6A6A" }}>
                      Referred by
                    </Typography>

                    {/* <Link
                    href={
                      user.user.userTypes.split(",").includes("user")
                        ? `/users/signup/${user.user.invited_by.id}`
                        : user.user.userTypes.split(",").includes("customer")
                        ? `/users/customer/${user.user.invited_by.id}`
                        : user.user.userTypes.split(",").includes("vendor") ||
                          user.user.userTypes.split(",").includes("wholesaler")
                        ? `/users/vendor/${user.user.invited_by.id}`
                        : user.user.userTypes.split(",").includes("influencer")
                        ? `/influencers/all/${user.user.invited_by.id}?code=${user.user.invited_by.refCode}`
                        : ""
                    }
                  >
                    <a> */}
                    <Typography
                      style={{
                        padding: "0.15rem 0",
                        color: "#242120",
                        textDecoration: "underline",
                      }}
                    >
                      {/* {user.user.invited_by.firstName}{" "}
                        {user.user.invited_by.lastName} */}{" "}
                      ref Name
                    </Typography>
                    {/* </a>
                  </Link> */}
                  </Box>

                  <Box style={{ display: "flex" }}>
                    <Box style={{ marginRight: "5rem" }}>
                      <Box>
                        <Typography
                          style={{ color: "#6A6A6A", marginRight: "1rem" }}
                        >
                          Total Referral
                        </Typography>

                        <Typography
                          style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}
                        >
                          {/* {user.user.my_referrers.length} */} 30
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          Referral Code
                        </Typography>

                        <Typography
                          style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}
                        >
                          {/* {user.user.refCode} */} 012345
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          Sign -up Platform
                        </Typography>

                        <Typography
                          style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}
                        >
                          {/* {user.user.platform === "wholesaler"
                          ? "Wholesale Center"
                          : "Marketplace Center"} */}{" "}
                          Platform
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Box>
                        <Typography
                          style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                          }}
                        >
                          Verified Referrals
                        </Typography>

                        <Typography
                          style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}
                        >
                          {/* {
                          user.user.my_referrers.filter(
                            (ref) => ref.activated === 1
                          ).length
                        } */}{" "}
                          40
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          Earnings
                        </Typography>
                        <Typography
                          style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}
                        >
                          {/* <NumberFormat
                          value={user.customer_earnings_payments
                            .map((earn) => earn.amount)
                            .reduce((a, b) => (a = Number(a) + Number(b)), 0)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        /> */}
                          2000000000000
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          Sign-up Date
                        </Typography>
                        <Typography
                          style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}
                        >
                          {/* {moment(user.user.createdAt).format("MMM DD, YYYY")} */}
                          today
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )
        )}
      </Box>
    </TableLayout>
  );
}
