import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '@orioro/react-ui-core'
import { useData } from '../../components/DataContext'

export function GeographySelector() {
  const { geoType, geoId, indicatorId } = useParams()

  const DATA = useData()
  const navigate = useNavigate()
  return (
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
          placeholder: 'Pesquise por município, região de saúde ou estado',
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
  )
}
