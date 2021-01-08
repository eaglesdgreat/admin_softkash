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
import moment from 'moment'

import TableLayout from './../components/Tables'
import Chart from '../components/graph/LineChart'
// import { useStateValue } from '../StateProviders';
import withAuth from './../components/withAuth'

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



const fetcher = async (...arg) => {
  // const [url, token] = arg
  const [url] = arg

  const response = await axios.get(
    url,
    // { headers: { authenticate: token } }
  )

  return response.data
}

const fetcherUsers = async (...arg) => {
  // const [url, token] = arg
  const [url] = arg

  const response = await axios.get(
    url,
    // { headers: { authenticate: token } }
  )

  return response.data
}

const fetcherAdmins = async (...arg) => {
  // const [url, token] = arg
  const [url] = arg

  const response = await axios.get(
    url,
    // { headers: { authenticate: token } }
  )

  return response.data
}

const fetcherMessages = async (...arg) => {
  // const [url, token] = arg
  const [url] = arg

  const response = await axios.get(
    url,
    // { headers: { authenticate: token } }
  )

  return response.data
}

const fetcherEmployees = async (...arg) => {
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
    totalLoansCount: data,
    isLoadingTotalLoans: !error && !data,
    isErrorTotalLoans: error
  }
}

const usersData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/users`

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcherUsers, { shouldRetryOnError: false })

  return {
    usersCount: data,
    isLoadingUsers: !error && !data,
    isErrorUsers: error
  }
}

const messagesData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/contacts`

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcherMessages, { shouldRetryOnError: false })

  return {
    messagesCount: data,
    isLoadingMessages: !error && !data,
    isErrorMessages: error
  }
}

const employeesData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/employers`

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcherEmployees, { shouldRetryOnError: false })

  return {
    employeesCount: data,
    isLoadingEmployees: !error && !data,
    isErrorEmployees: error
  }
}

const adminsData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/admins`

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcherAdmins, { shouldRetryOnError: false })

  return {
    adminsCount: data,
    isLoadingAdmins: !error && !data,
    isErrorAdmins: error
  }
}


const Dashboard = (props) => {
  const path = '/dashboard'
  const classes = useStyles()

  const tabData = [
    { name: 'All', value: 'all', active: true },
    { name: 'Paid', value: 'paid', active: false },
    { name: 'Rejected', value: 'rejected', active: false },
  ]

  const { totalLoansCount, isLoadingTotalLoans, isErrorTotalLoans } = activeLoansData()
  const { usersCount, isLoadingUsers, isErrorUsers } = usersData()
  const { messagesCount, isLoadingMessages, isErrorMessages } = messagesData()
  const { employeesCount, isLoadingEmployees, isErrorEmployees } = employeesData()
  const { adminsCount, isLoadingAdmins, isErrorAdmins } = adminsData()

  const [values, setValues] = useState(tabData)
  const [loan, setLoan] = useState('all')
  // const [graphData, setGraphData] = useState([])

  const handleChange = (event, newValue) => {
    setValues(
      values
        .map(value => ({ ...value, active: false }))
        .map((value, index) => ({
          ...value,
          active: index === newValue
        }))
    );

    handleLoans()
  };

  const handleLoans = () => {
    const data = values.find(value => value.active).value

    setLoan(data)
    onYearlyChange()
  }

  const active = values.findIndex(value => value.active)

  const gridBoxes = [
    {
      color: '#FFFFFF',
      text: 'Total Users',
      background: '#007945',
      data: (
        isErrorUsers ? '' : isLoadingUsers ? <CircularProgress style={{ 'color': '#FFFFFF' }} /> :
          usersCount &&
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
      data:
        (
          isErrorTotalLoans ? '' : isLoadingTotalLoans ? <CircularProgress style={{ 'color': '#FFFFFF' }} /> :
            totalLoansCount &&
            `${Math.round((totalLoansCount.data.data
              .filter(loan => loan.status.toLowerCase() === 'paid').length / totalLoansCount.data.data.length) * 100)}%`
        ),
      marginBottom: '30px',
    },

    {
      color: '#FFFFFF',
      text: 'Loans Rejected',
      background: '#FF0000',
      data: (
        isErrorTotalLoans ? '' : isLoadingTotalLoans ? <CircularProgress style={{ 'color': '#FFFFFF' }} /> :
          totalLoansCount &&
          <NumberFormat
            value={totalLoansCount.data.data.filter(loan => loan.status.toLowerCase() === 'rejected').length}
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
        isErrorMessages ? '' : isLoadingMessages ? <CircularProgress style={{ 'color': '#FFFFFF' }} /> :
          messagesCount &&
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
        isErrorEmployees ? '' : isLoadingEmployees ? <CircularProgress style={{ 'color': '#000060' }} /> :
          employeesCount &&
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
        isErrorAdmins ? '' : isLoadingAdmins ? <CircularProgress style={{ 'color': '#FFFFFF' }} /> :
          adminsCount &&
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


  // This function calculate the data for a calender year (e.g 2020)
  // and place the data in the graph (num of orders against month)
  const onYearlyChange = () => {
    const year = moment().format('YYYY')

    const newDate = []
    let data = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December']

    if (loan === 'all') {
      let items =
        totalLoansCount.data.data
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

      // console.log(newDate)
      // setGraphData([...newDate])
      // return newDate
    }

    if (loan === 'paid') {
      let items =
        totalLoansCount.data.data
          .filter(loan => loan.status.toLowerCase() === 'paid')
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

      // console.log(newDate)
      // setGraphData([...newDate])
      // return newDate
    }

    if (loan === 'rejected') {
      let items =
        totalLoansCount.data.data
          .filter(loan => loan.status.toLowerCase() === 'rejected')
          .filter(x => {
            const check = moment(x.createdAt).format('YYYY').toString() === year;
            // console.log(moment(x.createdAt).format('MMMM'))
            return check
          })
      console.log(items)

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

      // console.log(newDate)
      // setGraphData([...newDate])
      // return newDate
    }

    return newDate
  }


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

                  {
                    isLoadingAdmins || isLoadingEmployees || isLoadingMessages || isLoadingTotalLoans || isLoadingUsers ?
                      <Box
                        display="flex"
                      >
                        {box.data}
                      </Box>
                      :
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
                  }
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
                  // data: [25, 8, 30, 35, 40, 43, 40, 56, 78, 90, 12, 22, 34]
                  data: onYearlyChange()
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
