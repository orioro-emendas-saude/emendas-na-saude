import { Badge } from '@radix-ui/themes'
import { useData } from '../DataContext'

const COLORS_ASC = {
  'Muito Baixa': 'tomato',
  Baixa: 'orange',
  Média: 'amber',
  Alta: 'lime',
  'Muito Alta': 'green',
}

const COLORS_DESC = {
  'Muito Baixa': 'green',
  Baixa: 'lime',
  Média: 'amber',
  Alta: 'orange',
  'Muito Alta': 'tomato',
}

export function IndicatorRankBadge({ indicatorId, rankLabel }) {
  const DATA = useData()

  const indicator = DATA.indicators[indicatorId]

  const color =
    indicator.rank === 'ASC' ? COLORS_ASC[rankLabel] : COLORS_DESC[rankLabel]

  return <Badge color={color}>{rankLabel}</Badge>
}
