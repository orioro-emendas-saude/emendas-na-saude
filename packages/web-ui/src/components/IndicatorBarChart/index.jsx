import { interpolateBlues, interpolateGreens } from 'd3-scale-chromatic'
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
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { useData } from '../DataContext'
import { COLOR_SCALES } from '../MainMap'
import { color } from 'd3-color'

const CHART_COLORS = Object.fromEntries(
  Object.entries(COLOR_SCALES).map(([key, scale]) => [key, scale(0.5)]),
)

export function IndicatorBarChart({
  indicatorId,
  entries,
  highlights = {},
  width = '100%',
  height = 400,
}) {
  const DATA = useData()

  const chartColor = CHART_COLORS[get(DATA, `indicators.${indicatorId}.color`)]

  const sortedEntries = [...entries].sort((entryA, entryB) => {
    const rankKey = `${indicatorId}_rank`
    return entryA[rankKey] <= entryB[rankKey] ? -1 : 1
  })

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        width={500}
        height={300}
        data={sortedEntries}
        margin={{
          top: 5,
          right: 30,
          left: 20,
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
        // label={{
        //   angle: -90,
        //   value: get(DATA, `indicators.${indicatorId}.shortName`),
        // }}
        />
        <Tooltip />
        <Bar dataKey={indicatorId} activeBar={<Rectangle fill={chartColor} />}>
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
