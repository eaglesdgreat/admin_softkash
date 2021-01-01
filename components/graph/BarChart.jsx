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



export default function BarChart({ data }) {
  return (
    <Box
      display="flex"
      style={{paddingTop: '20px'}}
    >
      <Bar
        data={data}
        width={950}
        height={400}
        options={{
          responsive: true,
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
  )
}