import React from 'react'
import { BarGroup } from '@visx/shape'
import { Group } from '@visx/group'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'
import { withTooltip, Tooltip } from '@visx/tooltip'
import { LegendOrdinal } from '@visx/legend'
// import {} from '@visx/grid'



export default function BorrowersList(props) {
  const {
    colorArray,
    graphData,
    keysToInclude,
    measurements = {},
    background = '#FFFFFF',
    categoryAPI,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = props

  const {
    width = 950,
    graphWidth = '100%',
    height = 400,
    margin = {
      left: 0,
      right: 0,
      top: 40,
      bottom: 40,
    },
  } = measurements


  // returns a number array with totals for each and every year
  const totals = graphData.reduce((ret, cur) => {
    const t = keysToInclude.reduce((dailyTotal, k) => {
      dailyTotal += +cur[k]
      return dailyTotal
    }, 0)
    ret.push(t)
    return ret
  }, [])

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // getter function to get the category value for each year - categoryAPI is obtained from props
  const getCategory = (d) => d[categoryAPI]

  // scales for X-Axis - each year
  const xScale = scaleBand({
    domain: graphData.map(getCategory),
    padding: 0.2,
  })

  // scales for Y-Axis - 0 to maximum of totals in each years
  const yScale = scaleLinear({
    domain: [0, Math.max(...totals)],
    nice: true,
  })

  // scales for colorings for each key in bar chart - one to one mapping
  const color = scaleOrdinal({
    domain: keysToInclude,
    range: colorArray,
  })


  //getCapitalizedValue - a util function to return capitalized value for the string passed - e.g chandlerMBing becomes Chandler M Bing :P
  const getCapitalizedValue = (inputString) => {
    const alteredInputString = inputString.replace(/\.?([A-Z])/g, (x, y) => ' ' + y).replace(/^_/, '')
    return alteredInputString.charAt(0).toUpperCase() + alteredInputString.slice(1)
  }

  // scales for coloring for each key in legend - one to one mapping - sometimes we can use same color variable for legend as well
  const legendColor = scaleOrdinal({
    domain: keysToInclude.map((key) => {
      return getCapitalizedValue(key)
    }),
    range: colorArray,
  })


  // //getCapitalizedValue - a util function to return capitalized value for the string passed - e.g chandlerMBing becomes Chandler M Bing :P
  // const getCapitalizedValue = (inputString) => {
  //   const alteredInputString = inputString.replace(/\.?([A-Z])/g, (x, y) => ' ' + y).replace(/^_/, '')
  //   return alteredInputString.charAt(0).toUpperCase() + alteredInputString.slice(1)
  // }

  xScale.rangeRound([0, xMax])
  yScale.range([yMax, 0])


  return (
    <div className="summary-graph">
      <svg width={graphWidth} height={height} overflow="auto">
        <rect
          x={0}
          y={0}
          width={graphWidth}
          height={height}
          fill={background}
          rx={14}
        />
        <Group top={margin.top} left={margin.left} right={margin.right}>
          <AxisLeft
            hideTicks={true}
            scale={yScale}
            tickLabelProps={(value, index) => ({
              fontSize: 11,
              textAnchor: 'end',
            })}
          />
          <BarGroup
            data={graphData}
            keys={keysToInclude}
            x={getCategory}
            xScale={xScale}
            yScale={yScale}
            color={color}
          >
            {(barGroups) => {
              return barGroups.map((barGroup) => {
                return barGroup.bars.map((bar) => {
                  return (
                    <rect
                      key={`bar-stack-${barGroup.index}-${bar.index}`}
                      x={bar.x}
                      y={bar.y}
                      height={bar.height}
                      width={bar.width}
                      fill={bar.color}
                      onMouseLeave={event => {
                        tooltipTimeout = setTimeout(() => {
                          hideTooltip()
                        }, 300)
                      }}
                      onMouseMove={event => {
                        if (tooltipTimeout) {
                          clearTimeout(tooltipTimeout)
                        }
                        const top = bar.y + 10
                        const offset =
                          (xScale.paddingInner() * xScale.step()) / 2
                        const left = bar.x + bar.width + offset
                        showTooltip({
                          tooltipData: bar,
                          tooltipLeft: left,
                          tooltipTop: top,
                        })
                      }}
                    >
                      <animate
                        attributeName="height"
                        from={0}
                        to={bar.height}
                        dur="0.5s"
                        fill="freeze"
                      />
                    </rect>
                  )
                })
              })
            }}
          </BarGroup>

          <AxisBottom
            top={yMax}
            hideTicks={true}
            scale={xScale}
            tickLabelProps={(value, index) => ({
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>

      <div className="legend">
        <LegendOrdinal
          scale={legendColor}
          direction={'row'}
          labelMargin="0 15px 0 0"
        />
      </div>

      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} className="tool-tip">
          <strong>
          {'Sales made by ' + getCapitalizedValue(tooltipData.key) + '     in ' + tooltipData.bar.data[categoryAPI]}
          </strong>
          <div>{tooltipData.bar.data[tooltipData.key]}</div>
        </Tooltip>
      )}
    </div>
  )
}