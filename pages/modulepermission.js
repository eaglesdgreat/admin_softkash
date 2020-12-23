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
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment'

import TableLayout from './../components/Tables'
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



function ModulePermission() {
  const path = '/modulepermission'
  const classes = useStyles()

  const users = []
  for (let id = 1; id <= 500; id++)
    for (let name of ['Peterson Frankinstine'])
      for (let email of ['softkash@example.com'])
        for (let phone of ['07033390533'])
          for (let role of ['Super Admin', 'Admin'])
            users.push({ id, name, email, phone, role })

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
                500
							</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.box2}>
        <TableContainer className={classes.tContainer} component="div">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
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

                <TableCell></TableCell>
                <TableCell></TableCell>

                <TableCell>
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

                <TableCell>
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
              </TableRow>
            </TableHead>

            <TableBody>
              {
                users
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
                          {i + 1}
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
                            {user.name}
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
                          {user.phone}
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
                          {user.role}
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
    </TableLayout>
  )
}

export default ModulePermission