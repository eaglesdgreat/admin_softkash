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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import TableLayout from './../components/Tables'
import Graph from './../components/graph/BorrowListGraph.tsx'



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



const mockData = [
  {
    year: '2017',
    month: {
      january: {
        borrowers: 100,
        total: 300000,
      },
      february: {
        borrowers: 200,
        total: 100000,
      },
      march: {
        borrowers: 500,
        total: 1003000,
      },
      april: {
        borrowers: 1000,
        total: 900000,
      },
      may: {
        borrowers: 400,
        total: 200000,
      },
      june: {
        borrowers: 50,
        total: 9000,
      },
      july: {
        borrowers: 600,
        total: 1000000,
      },
      august: {
        borrowers: 100,
        total: 2000000,
      },
      september: {
        borrowers: 900,
        total: 2000000000,
      },
      october: {
        borrowers: 800,
        total: 5000000,
      },
      november: {
        borrowers: 30,
        total: 600000,
      },
      december: {
        borrowers: 20000,
        total: 3000000000,
      },
    },
  },
  {
    year: '2018',
    month: {
      january: {
        borrowers: 100,
        total: 300000,
      },
      february: {
        borrowers: 200,
        total: 100000,
      },
      march: {
        borrowers: 500,
        total: 1003000,
      },
      april: {
        borrowers: 1000,
        total: 900000,
      },
      may: {
        borrowers: 400,
        total: 200000,
      },
      june: {
        borrowers: 50,
        total: 9000,
      },
      july: {
        borrowers: 600,
        total: 1000000,
      },
      august: {
        borrowers: 100,
        total: 2000000,
      },
      september: {
        borrowers: 900,
        total: 2000000000,
      },
      october: {
        borrowers: 800,
        total: 5000000,
      },
      november: {
        borrowers: 30,
        total: 600000,
      },
      December: {
        borrowers: 20000,
        total: 3000000000,
      },
    },
  },
  {
    year: '2019',
    month: {
      january: {
        borrowers: 100,
        total: 300000,
      },
      february: {
        borrowers: 200,
        total: 100000,
      },
      march: {
        borrowers: 500,
        total: 1003000,
      },
      april: {
        borrowers: 1000,
        total: 900000,
      },
      may: {
        borrowers: 400,
        total: 200000,
      },
      june: {
        borrowers: 50,
        total: 9000,
      },
      july: {
        borrowers: 600,
        total: 1000000,
      },
      august: {
        borrowers: 100,
        total: 2000000,
      },
      september: {
        borrowers: 900,
        total: 2000000000,
      },
      october: {
        borrowers: 800,
        total: 5000000,
      },
      november: {
        borrowers: 30,
        total: 600000,
      },
      December: {
        borrowers: 20000,
        total: 3000000000,
      },
    },
  }
]

const mockData2 = [
  {
   year: '2017',
   joe: 1000,
   chandler: 2000,
   ross: 800,
  },
  {
   year: '2018',
   joe: 1500,
   chandler: 1800,
   ross: 1000,
  },
  {
   year: '2019',
   joe: 2000,
   chandler: 1750,
   ross: 950,
  }]

const colorArray = ['#191919', '#FFCF02', '#FF5F00']
// Object.keys(mockData).slice(1) -> ['joe','chandler','ross']
// Object.keys(mockData).shift() -> 'year'



function BorrowersList() {
  const path = '/borrowerslist'
  const classes = useStyles()

  const users = []
  for (let id = 1; id <= 1000; id++)
    for (let name of ['Peterson Frankinstine'])
      for (let email of ['softkash@example.com'])
        for (let amount of ['3,000,000'])
          for (let date of [moment().format('DD/MM/YYYY')])
            for (let time of [moment().format('hh:mm a')])
              users.push({ id, name, email, amount, date, time })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const yearlyData = (arg) => {
    const byYear = mockData.filter(date => date.year === arg)

    return byYear
  }
  // console.log(yearlyData('2017').year)
  // console.log(Object.keys(yearlyData('2017').month))
  // console.log(Object.keys(yearlyData('2017').month).shift())

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
      <Box className={classes.box}>
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
                    Borrowers List
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
                  numeric
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
                    TIME
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                users
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
                            fontWeight: '400'
                          }}
                        >
                          {user.id}
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
                            fontWeight: '400'
                          }}
                        >
                          {user.name}
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
                            fontWeight: '400'
                          }}
                        >
                          ₦{user.amount}
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
                            fontWeight: '400'
                          }}
                        >
                          {user.date}
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
                            fontWeight: '400'
                          }}
                        >
                          {user.time}
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
            count={users.length}
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
          paddingTop: '30px',
          width: '100%',
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
              Borrowers List Statistics
            </Typography>
          </Box>

          <Graph
            width={930}
            height={400}
            graphData={mockData}
          />
        </Box>
      </Box>
    </TableLayout>
  )
}

export default BorrowersList