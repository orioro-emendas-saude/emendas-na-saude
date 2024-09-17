import React from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { MainMap } from '../../components/MainMap'
import { Flex, Markdown } from '@orioro/react-ui-core'
import { INDICATORS } from '../../lib/data'
import styled from 'styled-components'
import { Heading } from '@radix-ui/themes'
import { useData } from '../../components/DataContext'
import { get } from 'lodash-es'
import { UfSummary } from '../../components/UfSummary'
import { UfReport } from '../../components/UfReport'
import { PaisReport } from '../../components/PaisReport'

const IndicatorLink = styled(NavLink)`
  width: 70px;
  display: block;

  > img {
    width: 100%;
    display: block;
  }
`

export function Mapa() {
  const { geoType = 'pais', geoId = 'BR', indicatorId = 'INEAB' } = useParams()
  const navigate = useNavigate()

  const DATA = useData()

  return (
    <Flex direction="column" gap="20">
      <Flex direction="row" gap="10" justifyContent="center">
        {Object.values(DATA.indicators).map((indicator) => (
          <IndicatorLink
            key={indicator.id}
            to={`/mapa/${indicator.id}/${geoType}/${geoId}`}
            title={indicator.name}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                outline: isActive ? '2px solid red' : null,
                // fontWeight: isActive ? 'bold' : '',
                // color: isPending ? 'red' : 'black',
                // viewTransitionName: isTransitioning ? 'slide' : '',
              }
            }}
          >
            <img src={`/img/indicadores/${indicator.id}.png`} />
          </IndicatorLink>
        ))}
      </Flex>

      <Flex direction="row">
        <Flex direction="column">
          {geoType === 'uf' && (
            <Link to={`/mapa/${indicatorId}/pais/brasil`}>Voltar (Brasil)</Link>
          )}
          {geoType === 'municipio' && (
            <Link
              to={`/mapa/${indicatorId}/uf/${get(DATA, `municipio.${geoId}.uf_id`)}`}
            >
              Voltar (
              {get(DATA, `uf.${get(DATA, `municipio.${geoId}.uf_id`)}.name`)})
            </Link>
          )}
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
          <Heading as="h2">
            {get(DATA, `indicators.${indicatorId}.name`)}
          </Heading>
          <Markdown>
            {get(DATA, `indicators.${indicatorId}.description`)}
          </Markdown>

          {geoType === 'uf' && <UfSummary id={geoId} />}
        </Flex>
      </Flex>

      {geoType === 'pais' && <PaisReport />}

      {geoType === 'uf' && (
        <>
          <UfReport />
        </>
      )}
    </Flex>
  )
}
