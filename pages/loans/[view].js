import React, { Fragment, useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
  Tooltip,
} from "@material-ui/core";
import { ArrowBackIos, EditOutlined } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";
import NumberFormat from "react-number-format";
import { useSnackbar } from "notistack";

import TableLayout from "./../../components/Tables";
// import { isAuthenticated } from '../../../lib/auth.helper'
// import PrivateRoute from './../../../Components/PrivateRoute'

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

  const { data, error, mutate: statusMutate } = useSWR([url], fetcher);

  return {
    loan: data,
    isLoading: !error && !data,
    isError: error,
    statusMutate,
  };
};

export default function View() {
  const path = "/loanspending";
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { view, type } = router.query;
  // console.log(type === 'rejectedloan');

  const menuList = [
    { name: "Select Status", value: "", disabled: true, title: "" },
    {
      name: "Approve Loan",
      value: "approved",
      disabled: false,
      title: "Select this status if you want to approve this loan",
    },
    {
      name: "Reject Loan",
      value: "rejected",
      disabled: false,
      title: "Select this status if you want to reject this loan",
    },
    {
      name: "Current Active Loan",
      value: "running",
      disabled: false,
      title: "This is the loan that has been paid to the client and the status is 'running'",
    },
  ];

  const menuList2 = [
    { name: "Select Status", value: "", disabled: true, title: "" },
    {
      name: "Approve Loan",
      value: "approved",
      disabled: false,
      title: "Select this status if you want to approve this loan",
    },
  ];

  const menuList3 = [
    { name: "Select Status", value: "", disabled: true, title: "" },
    {
      name: "Paid Loan",
      value: "paid",
      disabled: false,
      title: "Select this status if you want to set this loan as paid loan for the user",
    },
    {
      name: "Unpaid Loan",
      value: "un-paid",
      disabled: false,
      title: "Select this status if you want to set this loan as paid loan for the user",
    },
    {
      name: "Overdue Loan",
      value: "overdue",
      disabled: false,
      title: "Select this status if this loan has been overdue payment by the user",
    },
  ];

  // Fetching data from backend with SWR
  const { loan, isLoading, isError, statusMutate } = loanData();
  // console.log(loan.data[0])

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [prevValue, setPrevValue] = useState('')
  const anchorRef = useRef(null);

  const openMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();

    const { myValue } = e.currentTarget.dataset;
    // console.log(myValue);

    setPrevValue(loan.data[0].status);

    const url = `${process.env.BACKEND_URL}/api/loans/${view}`;

    try {
      statusMutate((data) => {
        return {
          ...loan.data[0],
          status: { ...data.data[0], status: myValue },
        };
      }, false);

      const response = await axios.put(url, { status: myValue });
      // console.log(response.data.data);

      if (response.data.data) {
        // statusMutate((data) => {
        //   return {
        //     ...loan.data[0],
        //     status: { ...data.data[0], status: myValue },
        //   };
        // }, false);

        enqueueSnackbar(`Loan status has been updated`, {
          variant: "success",
        });
      }
    } catch (e) {
      console.log(e);

      statusMutate((data) => {
        return {
          ...loan.data[0],
          status: { ...data.data[0], status: prevValue },
        };
      }, false);

      enqueueSnackbar(`Error updating loan status try again`, {
        variant: "error",
      });
    }
  };

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
            <Button
              size="large"
              className={classes.buttonHover}
              disableRipple
              onClick={openMenu}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
            >
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
                  textTransform: "uppercase",
                }}
              >
                update status
              </Typography>
            </Button>

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        // onKeyDown={handleListKeyDown}
                      >
                        {type === "approvedloan"
                          ? menuList.map((item, i) => (
                              <Tooltip title={item.title} key={i}>
                                <MenuItem
                                  data-my-value={item.value}
                                  onClick={(e) => {
                                    setSelected(item.value);
                                    handleStatusUpdate(e);
                                  }}
                                  disabled={item.disabled}
                                  selected={item.value === selected}
                                >
                                  {item.name}
                                </MenuItem>
                              </Tooltip>
                            ))
                          : type === "rejectedloan"
                          ? menuList2.map((item, i) => (
                              <Tooltip title={item.title} key={i}>
                                <MenuItem
                                  data-my-value={item.value}
                                  onClick={(e) => {
                                    setSelected(item.value);
                                    handleStatusUpdate(e);
                                  }}
                                  disabled={item.disabled}
                                  selected={item.value === selected}
                                >
                                  {item.name}
                                </MenuItem>
                              </Tooltip>
                            ))
                          : type.toString() === "activeloan" &&
                            menuList3.map((item, i) => (
                              <Tooltip title={item.title} key={i}>
                                <MenuItem
                                  data-my-value={item.value}
                                  onClick={(e) => {
                                    setSelected(item.value);
                                    handleStatusUpdate(e);
                                  }}
                                  disabled={item.disabled}
                                  selected={item.value === selected}
                                >
                                  {item.name}
                                </MenuItem>
                              </Tooltip>
                            ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        </Box>

        {isError ? (
          <Box display="flex" style={{ margin: "auto" }}>
            <p>Try Again Please</p>
          </Box>
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
                          {loan.data[0].type_of_business
                            ? loan.data[0].type_of_business
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
                      : ""}{" - "}
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
                  <Box display="flex">
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

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "50px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Amount
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                        }}
                      >
                        <NumberFormat
                          value={loan.data[0].amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "50px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Remaining Unpaid Loan Balance
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                        }}
                      >
                        <NumberFormat
                          value={loan.data[0].amount_remain}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex">
                    <Box style={{ marginBottom: "1.5rem" }}>
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Type
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                        }}
                      >
                        {loan.data[0].loan_type}
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "50px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Business Name
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                          whiteSpace: "initial",
                        }}
                      >
                        {loan.data[0].business_name}
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "50px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Business Description
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                          whiteSpace: "initial",
                        }}
                      >
                        {loan.data[0].business_description}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex">
                    <Box style={{ marginBottom: "1.5rem" }}>
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Interest
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                        }}
                      >
                        <NumberFormat
                          value={loan.data[0].interest}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "50px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Interest Rate
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                          whiteSpace: "initial",
                        }}
                      >
                        {loan.data[0].interest_rate}%
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "50px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Interest Rate Type
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                          whiteSpace: "initial",
                        }}
                      >
                        {loan.data[0].interest_rate_type}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex">
                    <Box style={{ marginBottom: "1.5rem" }}>
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Total Amount and Interest
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                        }}
                      >
                        <NumberFormat
                          value={loan.data[0].total_amount_and_interest}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "30px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Interest Remaining
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                          whiteSpace: "initial",
                        }}
                      >
                        <NumberFormat
                          value={loan.data[0].interest_remain}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "30px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Principal Amount
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                          whiteSpace: "initial",
                        }}
                      >
                        <NumberFormat
                          value={loan.data[0].principal_remain}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex">
                    <Box style={{ marginBottom: "1.5rem" }}>
                      <Typography style={{ color: "#6A6A6A" }}>
                        Reason for Loan
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                        }}
                      >
                        {loan.data[0].reason}
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "30px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Tenure
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                          whiteSpace: "initial",
                        }}
                      >
                        {loan.data[0].tenure}
                      </Typography>
                    </Box>

                    <Box
                      style={{ marginBottom: "1.5rem", paddingLeft: "30px" }}
                    >
                      <Typography style={{ color: "#6A6A6A" }}>
                        Loan Tenure Type
                      </Typography>

                      <Typography
                        style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                          whiteSpace: "initial",
                        }}
                      >
                        {loan.data[0].tenure_type}
                      </Typography>
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
