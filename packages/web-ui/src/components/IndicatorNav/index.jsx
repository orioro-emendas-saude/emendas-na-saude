import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { EvenSpacedList, Flex } from '@orioro/react-ui-core'
import styled from 'styled-components'
import { useData } from '../../components/DataContext'
import { assetUrl } from '../../lib/data'

const IndicatorLink = styled(NavLink)`
  max-width: 70px;
  display: flex;
  flex-direction: column;
  color: black;

  > img {
    width: 100%;
    display: block;
    margin-bottom: 4px;
  }

  > span {
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  @media print {
    display: none;
  }
`

export function IndicatorNav() {
  const DATA = useData()
  const { geoType = 'pais', geoId = 'BR', indicatorId = 'INEAB' } = useParams()

  return (
    <EvenSpacedList
      columns={{
        xs: 5,
        sm: 10,
      }}
      gap="10"
      justifyContent="center"
    >
      {Object.values(DATA.indicators).map((indicator) => (
        <IndicatorLink
          key={indicator.id}
          to={`/mapa/${indicator.id}/${geoType}/${geoId}`}
          title={indicator.name}
          style={({ isActive, isPending, isTransitioning }) => {
            return {
              outline: isActive ? '2px solid var(--accent-9)' : null,
              // fontWeight: isActive ? 'bold' : '',
              // color: isPending ? 'red' : 'black',
              // viewTransitionName: isTransitioning ? 'slide' : '',
            }
          }}
        >
          <img src={assetUrl(`/img/indicadores/${indicator.id}.png`)} />
          <span>{indicator.shortName}</span>
        </IndicatorLink>
      ))}

      <IndicatorLink
        to={`/mapa/todos/${geoType}/${geoId}`}
        title="Todos os indicadores"
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            outline: isActive ? '2px solid var(--accent-9)' : null,
            // fontWeight: isActive ? 'bold' : '',
            // color: isPending ? 'red' : 'black',
            // viewTransitionName: isTransitioning ? 'slide' : '',
          }
        }}
      >
        <img src={assetUrl(`/img/indicadores/TODOS.png`)} />
        <span>Todos</span>
      </IndicatorLink>
    </EvenSpacedList>
  )
}
