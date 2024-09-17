import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { loadIndicators, loadMunicipios, loadUfs } from '../../lib/data'
import { LoadingIndicator, useFetch } from '@orioro/react-ui-core'

export const DataContext = createContext({
  indicators: null,
  ufs: null,
  regioes_de_saude: null,
  municipios: null,
})

export function DataProvider({ children }) {
  const [dataQuery] = useFetch(
    useCallback(async () => {
      const [indicators, ufs, regioes_de_saude, municipios] = await Promise.all(
        [loadIndicators(), loadUfs(), Promise.resolve(null), loadMunicipios()],
      )

      return {
        indicators,
        ufs,
        uf: Object.fromEntries(ufs.map((uf) => [uf.id, uf])),
        regioes_de_saude,
        municipios,
        municipio: Object.fromEntries(municipios.map((mun) => [mun.id, mun])),
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
      {dataQuery.status === 'loading' && <LoadingIndicator />}
    </>
  )
}

export function useData() {
  return useContext(DataContext)
}
