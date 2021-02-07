import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputBase,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import axios from "axios";
import clsx from "clsx";
import { useSnackbar } from "notistack";

import TableLayout from "./../components/Tables";
import { useStateValue } from "../StateProviders";
import { authenticate, useCredentials } from "./../lib/auth.helper";

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
  button2: {
    "&:hover,&:focus": {
      backgroundColor: "#ffffff00",
    },
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
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: "5px",
    position: "relative",
    backgroundColor: "#FFFFFF",
    border: "1px solid #00487C",
    fontSize: "16px",
    lineHeight: "20px",
    fontStyle: "normal",
    fontWeight: "700",
    padding: "10px 3px 10px 10px",
    color: "#182C51",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: "Source Sans Pro",
    "&:focus": {
      borderRadius: "5px",
      borderColor: "#00487C",
      backgroundColor: "#FFFFFF",
    },
  },
}))(InputBase);

export default function TokenDialog({ authToken, email }) {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [disable, setDisable] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [resetToken, setResetToken] = useState()

  const [{ loginDialog }, dispatch] = useStateValue();
  // console.log(useCredentials())

  const handleChange = (event) => {
    const { name, value } = event.target;

    setToken(value);
  };

  const validateField = (e) => {
    const { name, value } = e.target;

    if (name === "token" && value !== "") {
      setDisable("allow");
    }

    if (name === "token" && value === "") {
      setDisable("");
    }
  };

  // click open dialog pop up
  // const handleDialogClick = () => {
  //   setOpen(true)
  // }

  // handle dialog close changes
  const handleDialogClose = () => {
    dispatch({
      type: "OPEN_LOGIN_DIALOG",
      items: false,
    });
  };

  //resend token
  const resendToken = async () => {
    const url = `${process.env.BACKEND_URL}/api/admin/login`;

    const body = {
      email: useCredentials().email,
      password: useCredentials().password
    }

    try {
      const response = await axios.post(url, body);
      console.log(response.data.response_message.split("[")[1].split("]")[0]);
      const resend = response.data.response_message.split("[")[1].split("]")[0];

      if (response.data) {
        setResetToken(resend)

        enqueueSnackbar(
          `Token has been resend to email. Check your email to provide valid token`,
          {
            variant: "success",
          }
        );
      }
    } catch (e) {
      console.log(e);

      enqueueSnackbar(`Unable to resend token. Try login again`, {
        variant: "error",
      });

       dispatch({
         type: "OPEN_LOGIN_DIALOG",
         items: false,
       });
    }
  };

  // token handler
  const handleToken = async (e) => {
    e.preventDefault();

    setLoading(true);
    const url = `${process.env.BACKEND_URL}/api/admins`;

    try {
      const response = await axios.get(url);
      // console.log(response);
      const admin = response.data.data.find((adm) => adm.email === useCredentials().email);
      // console.log(admin);

      if (token === useCredentials().token || token === resetToken) {
        // setLoading(false);

        enqueueSnackbar(
          `Login Successful. You are being redirected to your dashboard`,
          {
            variant: "success",
          }
        );

         dispatch({
           type: "OPEN_LOGIN_DIALOG",
           items: false,
         });

        authenticate({ token: useCredentials().token, ...admin }, () => {
          return router.push("/dashboard");
        });
      }

      // handleDialogClose()

      if (token !== useCredentials().token && token !== resetToken) {
        setLoading(false);

        enqueueSnackbar(`Invalid Token Provided. Try again`, {
          variant: "error",
        });

        //  dispatch({
        //    type: "OPEN_LOGIN_DIALOG",
        //    items: false,
        //  });
      }
    } catch (e) {
      console.log(e);

      if (e) {
        setLoading(false);

        enqueueSnackbar(`Error loging in. Try login again`, {
          variant: "error",
        });

         dispatch({
           type: "OPEN_LOGIN_DIALOG",
           items: false,
         });
      }
    }
  };

  return (
    <Dialog
      open={loginDialog}
      onClose={handleDialogClose}
      BackdropProps={{
        style: {
          opacity: 0.6,
        },
      }}
      PaperProps={{
        style: {
          borderRadius: "8px",
          width: "428px",
          // height: '369px',
          paddingBottom: "5%",
          paddingTop: "2.5%",
          boxShadow: "none",
        },
      }}
      // hideBackdrop // Disable the backdrop color/image
      // disableEnforceFocus // Let the user focus on elements outside the dialog
      // style={{ position: "initial" }} // This was the key point, reset the position of the dialog, so the user can interact with other elements
      disableBackdropClick // Remove the backdrop click (just to be sure)
    >
      <DialogTitle>
        <Typography
          className={classes.typography}
          style={{
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "28px",
          }}
        >
          Enter Token Here
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box
          display="flex"
          component="span"
          // style={{
          //   whiteSpace: 'initial',
          // }}
        >
          <FormControl
            className={classes.formControl}
            style={{ width: "100%" }}
          >
            <BootstrapInput
              id="last-name"
              value={token}
              name="token"
              required
              onChange={handleChange}
              onKeyUp={validateField}
            />
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Box display="flex" flexDirection="column" style={{ width: "100%" }}>
          <Box
            display="flex"
            style={{
              paddingLeft: "17px",
            }}
          >
            <Button
              size="large"
              disabled={disable === ""}
              className={classes.button2}
              onClick={handleToken}
              disableRipple
              style={{
                border: disable === "" ? "1px solid grey" : "1px solid #007945",
              }}
            >
              {loading ? (
                <CircularProgress size="2em" style={{ color: "#007945" }} />
              ) : (
                <Typography
                  className={classes.typography}
                  style={{
                    textAlign: "center",
                    color: disable === "" ? "grey" : "#007945",
                    fontSize: "13px",
                    fontWeight: "500",
                    lineHeight: "15px",
                    textTransform: "uppercase",
                    lineSpacing: "0.02em",
                  }}
                >
                  send
                </Typography>
              )}
            </Button>

            <Button
              size="large"
              className={classes.button}
              onClick={handleDialogClose}
              disableRipple
              style={{
                border: "1px solid #007945",
                backgroundColor: "#007945",
                marginLeft: "20px",
              }}
            >
              <Typography
                className={classes.typography}
                style={{
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: "500",
                  lineHeight: "15px",
                  textTransform: "uppercase",
                  lineSpacing: "0.02em",
                }}
              >
                cancel
              </Typography>
            </Button>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            style={{
              paddingTop: "30px",
              // margin: 'auto',
              // marginRight: "25px",
              // border: '1px solid red',
            }}
          >
            <Button
              size="small"
              className={classes.button}
              variant="text"
              onClick={resendToken}
              disableRipple
              style={{
                border: "none",
              }}
            >
              <Typography
                className={classes.typography}
                style={{
                  textAlign: "center",
                  color: "#007945",
                  fontSize: "15px",
                  fontWeight: "500",
                  lineHeight: "15px",
                  textTransform: "lowercase",
                  lineSpacing: "0.02em",
                }}
              >
                click here to resend token
              </Typography>
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
