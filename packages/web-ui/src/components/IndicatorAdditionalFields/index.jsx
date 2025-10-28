import { Output } from '@orioro/react-ui-core'
import { fmtIndicator, parseNumberPtBR } from '../../lib/data'
import { useData } from '../DataContext'
import { EmendasPerCapAdditionalFields } from './EmendasPerCapAdditionalFields'

export function IndicatorAdditionalFields({
  indicatorId,
  additionalFields,
  data,
}) {
  const DATA = useData()

  return (
    <>
      {' '}
      {Array.isArray(additionalFields) &&
        additionalFields.map(({ label, key }) => {
          return (
            <Output
              key={key}
              schema={{
                type: 'text',
              }}
              label={label}
              value={fmtIndicator(
                DATA.indicators[indicatorId],
                parseNumberPtBR(data[key]),
              )}
            />
          )
        })}
      {indicatorId === 'EMENDAS_PERCAP' && (
        <EmendasPerCapAdditionalFields data={data} />
      )}
    </>
  )
}
