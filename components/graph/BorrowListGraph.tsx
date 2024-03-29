import React from 'react';
import { Group } from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisBottom, AxisLeft } from '@visx/axis';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';

export type BarGroupProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  graphData?: [];
};

type CityName = 'New York' | 'San Francisco' | 'Austin';

const gray = '#D2DDEC';
export const green = '#007945';
const purple = '#9caff6';
export const background = '#ffffff';

const defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };



export default function BorrowersListGraph({
  width,
  height,
  events = false,
  margin = defaultMargin,

}: BarGroupProps) {


  const data = cityTemperature.slice(0, 12);
  const keys = Object.keys(data[0]).filter(d => d !== 'date') as CityName[];


  const parseDate = timeParse('%Y-%m-%d');
  const format = timeFormat('%b %d');
  const formatDate = (date: string) => format(parseDate(date) as Date);

  // accessors
  const getDate = (d: CityTemperature) => d.date;

  // scales
  const dateScale = scaleBand<string>({
    domain: data.map(getDate),
    padding: 0.2,
  });
  const cityScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });
  const tempScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => Number(d[key])))))],
  });
  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [gray, green, purple],
  });

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  dateScale.rangeRound([0, xMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <Group top={margin.top} left={margin.left}>
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={getDate}
          x0Scale={dateScale}
          x1Scale={cityScale}
          yScale={tempScale}
          color={colorScale}
        >
          {barGroups =>
            barGroups.map(barGroup => (
              <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                {barGroup.bars.map(bar => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4}
                    onClick={() => {
                      if (!events) return;
                      const { key, value } = bar;
                      alert(JSON.stringify({ key, value }));
                    }}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
      <AxisLeft
          scale={tempScale}
          stroke={gray}
          tickStroke={gray}
          // tickFormat={formatDate}
          hideAxisLine
          tickLabelProps={() => ({
            fill: gray,
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em',
          })}
        />
      <AxisBottom
        top={yMax + margin.top}
        tickFormat={formatDate}
        scale={dateScale}
        stroke={green}
        tickStroke={green}
        hideAxisLine
        tickLabelProps={() => ({
          fill: green,
          fontSize: 11,
          textAnchor: 'middle',
        })}
      />
    </svg>
  );
}