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
import { GeographySelector } from '../../components/GeographySelector'
import { DataTable } from '../../components/DataTable'
import { fmtIndicator } from '../../lib/data'
import { UfAllReport } from '../../components/UfAllReport'
import { RegiaoAllReport } from '../../components/RegiaoAllReport'
import { MunicipioAllReport } from '../../components/MunicipioAllReport'

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
            <GeographySelector />
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
            indicatorId={indicatorId}
          />
        </Flex>
        <Flex direction="column">
          {indicatorId !== 'todos' && (
            <>
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
            </>
          )}

          {indicatorId === 'todos' && (
            <>
              <Flex direction="column">
                <Heading as="h1" size="8">
                  {get(DATA, `${geoType}.${geoId}.name`)}
                </Heading>

                <Heading as="h3" size="5">
                  Resumo dos indicadores:
                </Heading>
                <DataTable
                  data={Object.values(DATA.indicators)
                    .map((indicator) => {
                      const value = get(
                        DATA,
                        geoType === 'pais'
                          ? `brasil.${indicator.id}`
                          : `${geoType}.${geoId}.${indicator.id}`,
                      )

                      return {
                        name: indicator.shortName,
                        value:
                          typeof value === 'undefined'
                            ? null
                            : fmtIndicator(
                                DATA.indicators[indicator.id],
                                value,
                              ),
                      }
                    })
                    .filter((entry) => entry.value !== null)}
                  schema={{
                    name: {
                      label: 'Indicador',
                    },
                    value: {
                      label: 'Valor',
                    },
                  }}
                />
              </Flex>
            </>
          )}
        </Flex>
      </Flex>

      {indicatorId !== 'todos' && (
        <>
          {geoType === 'uf' && <UfReport />}
          {geoType === 'regiao_de_saude' && <RegiaoReport />}
          {geoType === 'municipio' && <MunicipioReport />}
        </>
      )}

      {indicatorId === 'todos' && (
        <>
          {geoType === 'uf' && <UfAllReport />}
          {geoType === 'regiao_de_saude' && <RegiaoAllReport />}
          {geoType === 'municipio' && <MunicipioAllReport />}
        </>
      )}
    </Flex>
  )
}
