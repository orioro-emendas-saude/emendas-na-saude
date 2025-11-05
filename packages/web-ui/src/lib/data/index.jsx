import { entries, memoize } from 'lodash-es'

import Papa from 'papaparse'

export function assetUrl(path) {
  const root =
    process.env.NODE_ENV === 'production'
      ? (process.env.REACT_APP_ASSETS_ROOT || '').replace(/\/$/, '')
      : '/emendas-na-saude'

  return `${root}/${path.replace(/^\//, '')}`
}

export function fetchCsv(url, options = {}) {
  return new Promise((resolve) => {
    Papa.parse(url, {
      header: true,
      ...options,
      download: true,
      complete: ({ data, errors, meta }) => resolve([data, errors, meta]),
    })
  })
}

export function fmtIndicator(spec, value) {
  const { numberFormatter, measureUnit } = spec

  value = new Intl.NumberFormat('pt-BR', {
    // maximumSignificantDigits: 2,
    ...(numberFormatter ? JSON.parse(numberFormatter) : {}),
  }).format(value)

  return measureUnit ? `${value} ${measureUnit}` : value
}

export const loadIndicators = memoize(async function () {
  const [indicators] = await fetchCsv(
    assetUrl('/data/indicadores/indicadores.csv'),
  )

  return Object.fromEntries(indicators.map((spec) => [spec.id, spec]))
})

export function parseNumberPtBR(numberString) {
  // Replace Brazilian formatting (period for thousand separator and comma for decimal point)
  const normalized = (numberString || '0')
    .trim()
    .replace(/\./g, '')
    .replace(',', '.')
  const val = parseFloat(normalized)

  return Number.isNaN(val) ? 0 : val
}

export function addRank(entries, key, direction = 'ASC') {
  const ranked = [...entries].sort((entryA, entryB) => {
    const valueA = entryA[key]
    const valueB = entryB[key]

    return direction === 'ASC'
      ? valueA <= valueB
        ? -1
        : 1
      : valueA <= valueB
        ? 1
        : -1
  })

  return ranked.map((entry, index) => ({
    ...entry,
    [`${key}_rank`]: index + 1,
  }))
}

function dataLoader({ url, parseEntry }) {
  return memoize(async function () {
    const indicators = await loadIndicators()

    const indicatorIds = Object.keys(indicators)

    const [rawEntries] = await fetchCsv(url, {
      transform: (value, column) => {
        if (indicatorIds.includes(column.toUpperCase())) {
          return parseNumberPtBR(value)
        } else {
          return value
        }
      },
    })

    const entries =
      typeof parseEntry === 'function' ? rawEntries.map(parseEntry) : rawEntries

    //
    // For each indicator, apply rank
    //
    return indicatorIds.reduce(
      (acc, indicatorId) =>
        addRank(acc, indicatorId, indicators[indicatorId].rank),
      entries,
    )
  })
}

export const loadUfs = dataLoader({
  url: assetUrl('/data/indicadores/ufs.csv'),
  parseEntry: (entry) => ({
    ...entry,
    geoType: 'uf',
  }),
})

export const loadRegioesDeSaude = dataLoader({
  url: assetUrl('/data/indicadores/regioes-de-saude.csv'),
  parseEntry: (entry) => ({
    ...entry,
    geoType: 'regiao_de_saude',
  }),
})

export const loadMunicipios = dataLoader({
  url: assetUrl('/data/indicadores/municipios.csv'),
  parseEntry: (entry) => ({
    ...entry,
    geoType: 'municipio',
  }),
})

export const loadBr = dataLoader({
  url: assetUrl('/data/indicadores/br.csv'),
  parseEntry: (entry) => ({
    ...entry,
    geoType: 'pais',
  }),
})
