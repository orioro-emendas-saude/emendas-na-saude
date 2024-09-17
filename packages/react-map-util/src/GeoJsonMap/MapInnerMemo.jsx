import React, { memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

export const MapInnerMemo = memo(function MapInner({
  width,
  height,
  projection,
  geoJsonData,
  getGeographyProps,

  onSetHoveredGeo,
  children,
}) {
  return (
    <ComposableMap width={width} height={height} projection={projection}>
      <Geographies geography={geoJsonData}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const { onMouseEnter, ...props } = getGeographyProps(geo) || {}

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="white"
                stroke="black"
                {...props}
                cursor={props.onClick ? 'pointer' : 'auto'}
                onMouseEnter={(e) => {
                  onSetHoveredGeo(geo)

                  if (typeof onMouseEnter === 'function') {
                    onMouseEnter(e)
                  }
                }}
                onMouseLeave={(e) => {
                  onSetHoveredGeo(null)

                  if (typeof onMouseLeave === 'function') {
                    onMouseLeave(e)
                  }
                }}
              />
            )
          })
        }
      </Geographies>
      {children}
    </ComposableMap>
  )
})
