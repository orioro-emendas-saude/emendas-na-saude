import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MainMap } from '../../components/MainMap'
import { Box, Flex, Markdown, Button, Input } from '@orioro/react-ui-core'
import { Heading } from '@radix-ui/themes'
import { useData } from '../../components/DataContext'
import { get } from 'lodash-es'
import { UfSummary } from '../../components/UfSummary'
import { UfReport } from '../../components/UfReport'
import { PaisReport } from '../../components/PaisReport'
import { RegiaoSummary } from '../../components/RegiaoSummary'
import { RegiaoReport } from '../../components/RegiaoReport'
import { Breadcrumb } from '../../components/Breadcrumb'
import { IndicatorNav } from '../../components/IndicatorNav'
import { MunicipioSummary } from '../../components/MunicipioSummary'
import { MunicipioReport } from '../../components/MunicipioReport'
import ReactToPrint from 'react-to-print'
import styled from 'styled-components'
import { Icon } from '@mdi/react'
import { mdiPrinterOutline } from '@mdi/js'

const HideOnPrint = styled.div`
  @media print {
    display: none;
  }
`

const PrintButton = styled(Button)`
  @media print {
    display: none;
  }
`

export function Mapa({ printComponentRef }) {
  const { geoType = 'pais', geoId = 'BR', indicatorId = 'INEAB' } = useParams()
  const navigate = useNavigate()

  const DATA = useData()

  return (
    <Flex direction="column" gap="6">
      <IndicatorNav />

      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="6"
      >
        <Flex
          direction="column"
          gap="2"
          width={{
            xs: '100%',
            sm: '400px',
          }}
        >
          <HideOnPrint>
            <Input
              schema={useMemo(
                () => ({
                  type: 'select',
                  options: [
                    ...DATA.ufs.map((uf) => ({
                      label: `${uf.name} (UF)`,
                      value: `uf|${uf.id}`,
                    })),
                    ...DATA.regioes_de_saude.map((reg) => ({
                      label: `${reg.name} (Região de Saúde)`,
                      value: `regiao_de_saude|${reg.id}`,
                    })),
                    ...DATA.municipios.map((mun) => ({
                      label: `${mun.name} (Município)`,
                      value: `municipio|${mun.id}`,
                    })),
                  ],
                  placeholder:
                    'Pesquise por município, região de saúde ou estado',
                }),
                [DATA],
              )}
              value={`${geoType}|${geoId}`}
              onSetValue={(nextValue) => {
                if (nextValue) {
                  const [nextGeoType, nextGeoId] = nextValue.split('|')

                  navigate(`/mapa/${indicatorId}/${nextGeoType}/${nextGeoId}`)
                } else {
                  navigate(`/mapa/${indicatorId}/pais/brasil`)
                }
              }}
            />
          </HideOnPrint>
          <Breadcrumb />
        </Flex>
        <ReactToPrint
          trigger={() => (
            <PrintButton>
              Imprimir relatório <Icon path={mdiPrinterOutline} size="16px" />
            </PrintButton>
          )}
          content={() => printComponentRef.current}
        />
      </Flex>
      <Flex
        direction={{
          xs: 'column',
          md: 'row',
        }}
        alignItems="center"
      >
        <Flex direction="column">
          <MainMap
            geo={{
              type: geoType || 'pais',
              id: geoId,
            }}
            onSetGeo={({ type, id }) => {
              if (type === 'pais') {
                navigate(`/mapa/${indicatorId}/pais/BR`)
              } else {
                navigate(`/mapa/${indicatorId}/${type}/${id}`)
              }
            }}
            indicator={indicatorId}
          />
        </Flex>
        <Flex direction="column">
          {geoType === 'uf' && <UfSummary id={geoId} />}
          {geoType === 'regiao_de_saude' && <RegiaoSummary id={geoId} />}
          {geoType === 'municipio' && <MunicipioSummary id={geoId} />}

          <Box
            p="3"
            style={{
              borderRadius: '4px',
              backgroundColor: 'var(--accent-3)',
              fontSize: '.9rem',
            }}
          >
            <Flex direction="column" gap="3">
              <Heading as="h3" size="4">
                {get(DATA, `indicators.${indicatorId}.name`)}
              </Heading>
              <Markdown>
                {get(DATA, `indicators.${indicatorId}.description`)}
              </Markdown>
            </Flex>
          </Box>

          {geoType === 'pais' && <PaisReport />}
        </Flex>
      </Flex>

      {geoType === 'uf' && <UfReport />}
      {geoType === 'regiao_de_saude' && <RegiaoReport />}
      {geoType === 'municipio' && <MunicipioReport />}
    </Flex>
  )
}
