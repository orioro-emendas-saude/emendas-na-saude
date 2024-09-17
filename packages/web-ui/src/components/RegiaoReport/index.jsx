import { Flex } from '@orioro/react-ui-core'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'

export function RegiaoReport() {
  const { indicatorId, geoId } = useParams()

  const DATA = useData()

  const regiao = DATA.regiao_de_saude[geoId]

  return (
    <Flex direction="column">
      <Flex direction="column" gap="5">
        <Heading as="h3">
          Comparativo com outras regiões de saúde do estado:
        </Heading>
        <IndicatorBarChart
          geoType="regiao_de_saude"
          indicatorId={indicatorId}
          entries={DATA.regioes_de_saude.filter(
            (reg) => reg.uf_id === regiao.uf_id,
          )}
          highlights={{
            [regiao.id]: true,
          }}
        />
      </Flex>
      <Flex direction="column" gap="5">
        <Heading as="h3">Comparativo entre municípios da região:</Heading>
        <IndicatorBarChart
          geoType="municipio"
          indicatorId={indicatorId}
          entries={DATA.municipios.filter(
            (municipio) => municipio.regional_id === geoId,
          )}
        />
      </Flex>
    </Flex>
  )
}
