import { get } from 'lodash-es'
import React from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useData } from '../DataContext'
import { COLOR_SCALES } from '../MainMap'
import { color } from 'd3-color'
import { fmtIndicator } from '../../lib/data'
import { useNavigate } from 'react-router-dom'

const CHART_COLORS = Object.fromEntries(
  Object.entries(COLOR_SCALES).map(([key, scale]) => [key, scale(0.5)]),
)

const Y_AXIS = {
  tickSize: 10,
  label: {
    angle: -90,
    offset: 30,
    position: 'left',
    style: {
      textAnchor: 'middle',
    },
  },
  tick: {
    // stroke: 'black',
    fontSize: 12,
  },
  tickLine: false,
  axisLine: false,
}

export function IndicatorBarChart({
  indicatorId,
  entries,
  highlights = {},
  width = '100%',
  height = 400,
  onClickBar,
}) {
  const DATA = useData()

  const navigate = useNavigate()

  const chartColor =
    CHART_COLORS[get(DATA, `indicators.${indicatorId}.color`)] ||
    CHART_COLORS.blue

  const sortedEntries = [...entries].sort((entryA, entryB) => {
    const rankKey = `${indicatorId}_rank`
    return entryA[rankKey] <= entryB[rankKey] ? -1 : 1
  })

  const fmtValue = (value) => fmtIndicator(DATA.indicators[indicatorId], value)

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        width={500}
        height={height}
        data={sortedEntries}
        margin={{
          top: 30,
          right: 30,
          left: 40,
          bottom: 100,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={entries.length <= 30 ? 0 : 'auto'}
          textAnchor="start"
          verticalAnchor="start"
          angle={40}
          fontSize={12}
        />
        <YAxis
          {...Y_AXIS}
          label={{
            ...Y_AXIS.label,
            value: DATA.indicators[indicatorId].shortName,
          }}
          tickFormatter={fmtValue}
        />
        <Tooltip formatter={fmtValue} />
        <Bar
          onClick={(entry) => {
            if (entry.geoType) {
              navigate(`/mapa/${indicatorId}/${entry.geoType}/${entry.id}`)
            }
          }}
          style={{
            cursor: 'pointer',
          }}
          dataKey={indicatorId}
          activeBar={<Rectangle fill={chartColor} />}
        >
          {sortedEntries.map((entry, index) => {
            const entryColor = highlights[entry.id]
              ? chartColor
              : color(chartColor).copy({ opacity: 0.5 }).rgb()

            return <Cell key={`cell-${index}`} fill={entryColor} />
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
