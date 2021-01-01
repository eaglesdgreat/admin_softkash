import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Box,
  MenuItem,
  InputBase,
  Button,
  Menu
} from '@material-ui/core'
import { Bar } from "react-chartjs-2";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: "wrap",
    // flexDirection: "column",
    margin: "1.5rem 1rem 1rem 1.3rem",
    // padding: " 1.5rem 3rem 4rem 1.3rem",
    height: "100%"
  },
  title: {
    fontSize: "0.875rem",
    color: "#6A6A6A",
  },
  button: {
    width: "5rem"
  }
}));



export default function BarChart({ data }) {
  const classes = useStyles();

  return (
    // <Box className={classes.root}>
      <Box
        display="flex"
        style={{
          paddingTop: '20px',
          // position: "relative",
        }}
      >
        <Bar
          data={data}
          width={950}
          height={300}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            type: "bar",
            scales: {
              xAxes: [{
                gridLines: {
                  // drawBorder: false,
                  drawOnChartArea: false
                }
              }],
              yAxes: [{
                gridLines: {
                  // display: false,
                  drawBorder: false,
                  drawOnChartArea: true
                },
                ticks: {
                  padding: 1
                }
              }]
            },
          }}
        />
      </Box>
    // </Box>
  )
}