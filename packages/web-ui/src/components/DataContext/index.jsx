import { createContext, useCallback, useContext } from 'react'
import {
  assetUrl,
  fetchCsv,
  loadBr,
  loadIndicators,
  loadMunicipios,
  loadRegioesDeSaude,
  loadUfs,
} from '../../lib/data'
import {
  LoadingIndicator,
  LoadingOverlay,
  useFetch,
} from '@orioro/react-ui-core'

export const DataContext = createContext({
  indicators: null,
  ufs: null,
  regioes_de_saude: null,
  municipios: null,
})

export function DataProvider({ children }) {
  const [dataQuery] = useFetch(
    useCallback(async () => {
      const [indicators, ufs, regioes_de_saude, municipios, brasil, [DTB]] =
        await Promise.all([
          loadIndicators(),
          loadUfs(),
          loadRegioesDeSaude(),
          loadMunicipios(),
          loadBr(),
          fetchCsv(assetUrl('/geo/DTB.csv')),
        ])

      return {
        indicators,
        ufs,
        uf: Object.fromEntries(ufs.map((uf) => [uf.id, uf])),
        regioes_de_saude,
        regiao_de_saude: Object.fromEntries(
          regioes_de_saude.map((reg) => [reg.id, reg]),
        ),
        municipios,
        municipio: Object.fromEntries(municipios.map((mun) => [mun.id, mun])),
        brasil: brasil[0],
        DTB,
      }
    }, []),
  )

  return (
    <>
      {dataQuery.status === 'success' && (
        <DataContext.Provider value={dataQuery.result}>
          {children}
        </DataContext.Provider>
      )}
      {dataQuery.status === 'loading' && (
        <div
          style={{
            height: '400px',
            position: 'relative',
          }}
        >
          <LoadingOverlay />
        </div>
      )}
    </>
  )
}

export function useData() {
  return useContext(DataContext)
}
