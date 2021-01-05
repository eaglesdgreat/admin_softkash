import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Divider,
  Tabs,
  Tab,
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'

import TableLayout from './../components/Tables'
import Chart from '../components/graph/LineChart'
// import { useStateValue } from '../StateProviders';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'rgba(0, 121, 69, 0.05)',
    borderRadius: '25px'
  },
  avatar: {
    color: '#007945',
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
  indicator: {
    backgroundColor: '#2C7BE5',
  },
  typography: {
    fontFamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '28px',
    letterSpacing: '0.1px',
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
  },
  notify: {
    textDecoration: 'none',
    '&:hover,&:focus,&:active,&:visited': {
      textDecoration: 'none',
    },
  }
}))



// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const { data: usersCount } = await axios.get(`${process.env.BACKEND_URL}/api/users`)
  const { data: totalLoansCount } = await axios.get(`${process.env.BACKEND_URL}/api/loans`)
  const { data: loansDisbursedCount } = await axios.get(`${process.env.BACKEND_URL}/api/loans/by_status/paid`)
  const { data: loansRejectedCount } = await axios.get(`${process.env.BACKEND_URL}/api/loans/by_status/rejected`)
  const { data: adminsCount } = await axios.get(`${process.env.BACKEND_URL}/api/admins`)
  const { data: messagesCount } = await axios.get(`${process.env.BACKEND_URL}/api/contacts`)
  const { data: employeesCount } = await axios.get(`${process.env.BACKEND_URL}/api/employers`)

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      usersCount,
      loansDisbursedCount,
      totalLoansCount,
      loansRejectedCount,
      messagesCount,
      employeesCount,
      adminsCount
    },
  }
}



const Dashboard = (props) => {
  const path = '/dashboard'
  const classes = useStyles()

  const tabData = [
    { name: 'All', active: true },
    { name: 'Direct', active: false },
    { name: 'Organic', active: false },
  ]

  const {
    usersCount,
    loansDisbursedCount,
    totalLoansCount,
    loansRejectedCount,
    messagesCount,
    employeesCount,
    adminsCount
  } = props
  // console.log(totalLoansCount)

  const [values, setValues] = useState(tabData)

  const handleChange = (event, newValue) => {
    setValues(
      values
        .map(value => ({ ...value, active: false }))
        .map((value, index) => ({
          ...value,
          active: index === newValue
        }))
    );
  };

  const active = values.findIndex(value => value.active)

  const gridBoxes = [
    {
      color: '#FFFFFF',
      text: 'Total Users',
      background: '#007945',
      data: (
        <NumberFormat
          value={usersCount.data.data.length}
          displayType={'text'}
          thousandSeparator={true}
        // prefix={'₦'}
        />
      ),
      marginBottom: '50px',
    },

    {
      color: '#FFFFFF',
      text: 'Loans Disbursed Percentage',
      background: '#71DB71',
      data: `${Math.round((loansDisbursedCount.data.length / totalLoansCount.data.data.length) * 100)}%`,
      marginBottom: '30px',
    },

    {
      color: '#FFFFFF',
      text: 'Loans Rejected',
      background: '#FF0000',
      data: (
        <NumberFormat
          value={loansRejectedCount.data.length}
          displayType={'text'}
          thousandSeparator={true}
        // prefix={'₦'}
        />
      ),
      marginBottom: '50px',
    },

    {
      color: '#FFFFFF',
      text: 'Messages',
      background: '#2F80ED',
      data: (
        <NumberFormat
          value={messagesCount.data.length}
          displayType={'text'}
          thousandSeparator={true}
        // prefix={'₦'}
        />
      ),
      marginBottom: '50px',
    },

    {
      color: '#000060',
      text: 'Employees',
      background: 'rgba(255, 211, 0, 0.7)',
      data: (
        <NumberFormat
          value={employeesCount.data.length}
          displayType={'text'}
          thousandSeparator={true}
        // prefix={'₦'}
        />),
      marginBottom: '50px',
    },

    {
      color: '#FFFFFF',
      text: 'Module Permission Role',
      background: '#000060',
      data: (
        <NumberFormat
          value={adminsCount.data.length}
          displayType={'text'}
          thousandSeparator={true}
        // prefix={'₦'}
        />
      ),
      marginBottom: '30px',
    }
  ]

  return (
    <TableLayout path={path}>
      <Box style={{
        display: "flex",
        // justifyContent: "space-between",
        // alignItems: "center",
      }}>
        <Typography
          className={classes.typography}
          style={{
            fontWeight: '400',
            fontSize: '54px',
            color: '#007945',
          }}
        >
          Dashboard
				</Typography>
      </Box>

      <Box
        display="flex"
        style={{
          marginTop: '50px',
        }}
      >
        <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {
            gridBoxes.map((box, i) => (
              <Grid
                item xs={4} sm={4} md={4} lg={4} xl={4}
                key={i}
              // style={{
              // 	flexBasic: '40%'
              // }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{
                    width: '85%',
                    height: '160px',
                    background: box.background,
                    borderRadius: '13px',
                    paddingTop: '15px',
                    paddingBottom: '25px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                  }}
                >
                  <Typography
                    className={classes.box}
                    style={{
                      color: box.color,
                      marginBottom: box.marginBottom,
                    }}
                  >
                    {box.text}
                  </Typography>

                  <Typography
                    className={classes.box}
                    style={{
                      color: box.color,
                      fontWeight: 'normal',
                      fontSize: '24px',
                    }}
                  >
                    {box.data}
                  </Typography>
                </Box>
              </Grid>
            ))
          }
        </Grid>
      </Box>

      <Box
        display="flex"
        style={{
          width: '100%',
          paddingTop: '30px'
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          style={{
            background: '#ffffff',
            width: '96%',
            border: '1px solid #E4EBF6',
            borderRadius: '10px'
          }}
        >
          <Box
            display="flex"
            // justifyContent="flex-start"
            style={{
              background: '#ffffff',
              // borderRadius: '10px',
              width: '96%',
              paddingTop: '20px',
              paddingLeft: '20px'
            }}
          >
            <Typography
              style={{
                fontFamily: 'Cerebri Sans',
                fontSize: '24px',
                fontWeight: '600',
                lineHeight: '30.48px',
                fontStyle: 'normal',
                letterSpacing: '-1%',
                color: '#007945'
              }}
            >
              Loan Performance
            </Typography>

            <Box
              display="flex"
              justifyContent="flex-end"
              style={{
                width: '75%'
              }}
            >
              <Tabs
                value={active}
                onChange={handleChange}
                variant="standard"
                classes={{
                  indicator: classes.indicator,
                }}
              >
                {values.map((value, i) => (
                  <Tab
                    key={i}
                    value={i}
                    label={value.name}
                    // className={clsx(classes.typography && classes.tab1)}
                    style={{
                      fontFamily: 'Cerebri Sans',
                      fontWeight: '400',
                      fontSize: '13px',
                      lineHeight: '21px',
                      letterSpacing: '-0.01em',
                      color: active === i ? '#1F2D3D' : '#95AAC9',
                      // textTransform: 'uppercase',
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>

          <Divider style={{ border: '1px solid #EDF2F9' }} />

          <Chart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: "Loans",
                  borderColor: '#71DB71',
                  borderWidth: 3,
                  pointBorderColor: '#71DB71',
                  pointBackgroundColor: '#71DB71',
                  pointBorderWidth: 1,
                  data: [25, 8, 30, 35, 40, 43, 40, 56, 78, 90, 12, 22, 34]
                }
              ]
            }}
          />
        </Box>
      </Box>
    </TableLayout>
  )
}

export default Dashboard
