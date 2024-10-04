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
import { assetUrl, fmtIndicator } from '../../lib/data'
import { UfAllReport } from '../../components/UfAllReport'
import { RegiaoAllReport } from '../../components/RegiaoAllReport'
import { MunicipioAllReport } from '../../components/MunicipioAllReport'
import QRCode from 'react-qr-code'

const HideOnPrint = styled.div`
  @media print {
    display: none;
  }
`

const PrintOnly = styled.div`
  display: none;
  @media print {
    display: block;
  }
`

const PrintButton = styled(Button)`
  @media print {
    display: none;
  }
`

const HeaderContainer = styled(Flex)`
  @media print {
    background-color: #efefef;
    padding: 10px;
    border-radius: 10px;
  }
`

const PrintBreak = styled(PrintOnly)`
  @media print {
    page-break-after: always;
  }
`

export function Mapa({ printComponentRef }) {
  const { geoType = 'pais', geoId = 'BR', indicatorId = 'INEAB' } = useParams()
  const navigate = useNavigate()

  const DATA = useData()

  return (
    <Flex direction="column" gap="6">
      <IndicatorNav />

      <HeaderContainer
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

        <PrintOnly>
          <Flex
            direction="row"
            gap="5"
            justifyContent="space-between"
            p="4"
            alignItems="center"
            style={{
              backgroundColor: '#EFEFEF',
              borderRadius: '10px',
            }}
          >
            <img
              style={{
                height: 80,
                flexShrink: 0,
              }}
              src={assetUrl(`/img/mapa-header.png`)}
            />
            <Flex
              direction="column"
              gap="2"
              style={{
                maxWidth: '200px',
                fontSize: '.8rem',
              }}
            >
              <Heading as="h5" size="1">
                Acesse o relatório completo pelo link ou escaneando o QR Code:
              </Heading>
              <a
                style={{
                  color: 'black',
                  wordBreak: 'break-all',
                }}
                href={window.location.href}
              >
                {window.location.href}
              </a>
            </Flex>

            <div>
              <QRCode size={80} value={window.location.href} />
            </div>
          </Flex>
        </PrintOnly>

        <ReactToPrint
          documentTitle={`Emendas na Saúde - ${get(DATA, `${geoType}.${geoId}.name`)} - ${indicatorId === 'todos' ? 'Relatório geral' : get(DATA, `indicators.${indicatorId}.name`)}`}
          trigger={() => (
            <PrintButton>
              Imprimir relatório <Icon path={mdiPrinterOutline} size="16px" />
            </PrintButton>
          )}
          content={() => printComponentRef.current}
        />
      </HeaderContainer>

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

      <PrintBreak>
        <div>O relatório segue na próxima página</div>
      </PrintBreak>

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

      <PrintOnly></PrintOnly>
    </Flex>
  )
}
