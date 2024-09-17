import { color } from 'd3-color'
import { ContinuousColorLegend } from '.'

export default {
  title: 'ContinuousColorLegend',
}

export const Basic = () => (
  <ContinuousColorLegend
    min={{
      color: 'white',
      label: '0 hab',
    }}
    max={{
      color: 'blue',
      label: '1032 hab',
    }}
  />
)
