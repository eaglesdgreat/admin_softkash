import React, { useState, useRef, Fragment, useEffect } from 'react'
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
  IconButton,
  InputBase,
  Hidden,
  Grid,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import axios from 'axios'
import clsx from 'clsx';

import { useStateValue } from '../StateProviders';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    display: 'flex',
  },
  typography: {
    fontfamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    color: '#2F3237',
    lineHeight: '28px',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  image: {
    maxWidth: '90%',
    maxHeight: 'auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '90%',
      maxHeight: 'auto'
    },
  },
  cssLabel: {
    color: " #007945",
    fontfamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '28px',
    letterSpacing: '0.1px',
  },
  cssOutlinedInput: {
    whiteSpace: 'initial',
    '&$cssFocused $notchedOutline': {
      borderColor: '#FFFFFF00'
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#FFFFFF00 !important'
  },
  roots: {
    // background: "blue",
    border: "1px solid #979797",
    borderRadius: "23px",
    width: '200%',
    height: '38px',
  },
  input: {
    color: "#007945",
    fontfamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '28px',
    letterSpacing: '0.1px',
    marginTop: '-10px',
  }
}))



function Search() {
  const classes = useStyles()
  // const { tableNav } = props
  const router = useRouter();

  const [{ activeLoansSearch }, dispatch] = useStateValue();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/loans`)
        // console.log(response.data.data.data)

        if (response.data.data.data) {
          dispatch({
            type: 'GET_ACTIVE_LOANS_SEARCH',
            items: response.data.data.data
          })
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const [search, setSearch] = useState('')

  const onSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const checkSearch = (event) => {
    if(search === '') {
      if (router.pathname === '/activeloanslist') {
        dispatch({
          type: 'GET_ACTIVE_LOANS_RESULT',
          items: []
        })
      }
    }
  }

  const enterSearch = (event) => {
    if (event.charCode === 13) {
      searchResult()
    }
  }

  const searchResult = () => {
    if (router.pathname === '/activeloanslist') {
      const data = activeLoansSearch
        .filter(loan => loan.status.toLowerCase() === 'running' || loan.status.toLowerCase() === 'paid'
          || loan.status.toLowerCase() === 'un-paid' || loan.status.toLowerCase() === 'overdue')

      let currentList = data.map(request => {
        // console.log({...item})
        return { ...request }
      })
      // console.log(currentList)

      if (search !== '') {
        let newList = []

        newList = currentList.filter(request => {
          const name = (`${request.user ? request.user.first_name : ''} ${request.user ? request.user.last_name : ''} 
          ${request.status} ${request.amount} ${request.user ? request.user.email : ''}`).toLowerCase()
          return name.includes(search.toLowerCase())
        })
        // console.log(newList)

        dispatch({
          type: 'GET_ACTIVE_LOANS_RESULT',
          items: newList
        })
      }
    }

    if (router.pathname === '/loanspending') {
      const data = activeLoansSearch
        .filter(loan => loan.status.toLowerCase() === 'running' || loan.status.toLowerCase() === 'paid'
          || loan.status.toLowerCase() === 'un-paid' || loan.status.toLowerCase() === 'overdue')

      let currentList = data.map(request => {
        // console.log({...item})
        return { ...request }
      })
      // console.log(currentList)

      if (search !== '') {
        let newList = []

        newList = currentList.filter(request => {
          const name = (`${request.user ? request.user.first_name : ''} ${request.user ? request.user.last_name : ''} 
          ${request.status} ${request.amount} ${request.user ? request.user.email : ''}`).toLowerCase()
          return name.includes(search.toLowerCase())
        })
        // console.log(newList)

        dispatch({
          type: 'GET_ACTIVE_LOANS_RESULT',
          items: newList
        })
      }
    }
  }

  return (
    <Grid container spacing={10}>
      <Grid item>
        <Box
          // display="flex"
          style={{
            paddingLeft: 30,
            width: '100%'
          }}
        >
          <TextField
            type="text"
            fullWidth
            variant="outlined"
            margin="none"
            className={classes.roots}
            value={search}
            onChange={(event) => onSearchChange(event)}
            onKeyPress={enterSearch}
            onKeyUp={checkSearch}
            placeholder="Search"
            id="input-search"
            InputProps={{
              className: classes.input,
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              startAdornment: (
                <InputAdornment position="start">
                  <img src="/search.svg" alt="search" />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Search
