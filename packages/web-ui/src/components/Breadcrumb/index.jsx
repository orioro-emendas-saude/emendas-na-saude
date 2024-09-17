import { Link, useParams } from 'react-router-dom'
import { useData } from '../DataContext'
import { Flex } from '@orioro/react-ui-core'
import styled from 'styled-components'

const Step = styled(Link)`
  color: black;

  &:not(:last-child) {
    white-space: nowrap;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export function Breadcrumb() {
  const { geoType, geoId, indicatorId } = useParams()
  const DATA = useData()

  switch (geoType) {
    case 'pais': {
      return (
        <Flex direction="row" gap="2">
          <Step to={`/mapa/${indicatorId}/pais/brasil`}>Brasil</Step>
        </Flex>
      )
    }
    case 'uf': {
      const uf = DATA.uf[geoId]
      return (
        <Flex direction="row" gap="2" flexWrap="wrap">
          <Step to={`/mapa/${indicatorId}/pais/brasil`}>Brasil</Step>
          <span>&gt;</span>
          <Step to={`/mapa/${indicatorId}/uf/${geoId}`}>{uf.name}</Step>
        </Flex>
      )
    }
    case 'regiao_de_saude': {
      const regiao = DATA.regiao_de_saude[geoId]
      const uf = DATA.uf[regiao.uf_id]

      return (
        <Flex direction="row" gap="2" flexWrap="wrap">
          <Step to={`/mapa/${indicatorId}/pais/brasil`}>Brasil</Step>
          <span>&gt;</span>
          <Step to={`/mapa/${indicatorId}/uf/${uf.id}`}>{uf.name}</Step>
          <span>&gt;</span>
          <Step to={`/mapa/${indicatorId}/regiao_de_saude/${geoId}`}>
            {regiao.name}
          </Step>
        </Flex>
      )
    }
    case 'municipio': {
      const municipio = DATA.municipio[geoId]
      const regiao = DATA.regiao_de_saude[municipio.regiao_de_saude_id]
      const uf = DATA.uf[regiao.uf_id]

      return (
        <Flex direction="row" gap="2" flexWrap="wrap">
          <Step to={`/mapa/${indicatorId}/pais/brasil`}>Brasil</Step>
          <span>&gt;</span>
          <Step to={`/mapa/${indicatorId}/uf/${uf.id}`}>{uf.name}</Step>
          <span>&gt;</span>
          <Step to={`/mapa/${indicatorId}/regiao_de_saude/${regiao.id}`}>
            {regiao.name}
          </Step>
          <span>&gt;</span>
          <Step to={`/mapa/${indicatorId}/municipio/${municipio.id}`}>
            {municipio.name}
          </Step>
        </Flex>
      )
    }
  }
}
