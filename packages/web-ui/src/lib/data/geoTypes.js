export const GEO_TYPES = {
  pais: {
    label: 'Brasil',
  },
  uf: {
    parentType: 'pais',
  },
  municipio: {
    parentType: 'uf',
  },
}
