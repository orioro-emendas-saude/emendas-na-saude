import {
  ErrorDisplay,
  Flex,
  LoadingOverlay,
  replaceable,
} from '@orioro/react-ui-core'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Tooltip, useTooltip } from './Tooltip'
import { MapInnerMemo } from './MapInnerMemo'
import { useGeoDataQuery } from './useGeoDataQuery'
import { ContinuousColorLegend } from '../ContinuousColorLegend'

const Loading = replaceable(LoadingOverlay)

function defaultGetGeographyProps() {
  return {}
}

function defaultGetTooltipContents(geo) {
  return (
    <Flex direction="column">
      {Object.entries(geo.properties).map(([property, value]) => (
        <div key={property}>
          <span>{property}</span>: <span>{value + ''}</span>
        </div>
      ))}
    </Flex>
  )
}

export function GeoJsonMap({
  geoJson: geoJsonOrUrl,
  metadata,
  getFeatureId,
  dataContext,

  width = 400,
  height = 400,
  projection,
  style = {},
  children,
  loading = 'Carregando dados',

  getGeographyProps = defaultGetGeographyProps,
  getTooltipContents = defaultGetTooltipContents,

  onDataLoaded,
}) {
  const [geoDataQuery] = useGeoDataQuery(geoJsonOrUrl, {
    metadata,
    getFeatureId,
    dataContext,
    width,
    height,
    projection,
  })

  useEffect(() => {
    if (
      typeof onDataLoaded === 'function' &&
      geoDataQuery.status === 'success'
    ) {
      onDataLoaded(geoDataQuery.result)
    }
  }, [geoDataQuery.result])

  const [hoveredGeo, setHoveredGeo] = useState(null)

  const tooltipContents = useMemo(() => {
    return hoveredGeo && getTooltipContents && geoDataQuery.result
      ? getTooltipContents(hoveredGeo, geoDataQuery.result.context)
      : null
  }, [hoveredGeo, getTooltipContents, geoDataQuery.result?.context])

  const tooltip = useTooltip({
    contents: tooltipContents,
  })

  const _getGeographyProps = useCallback(
    (feature) => getGeographyProps(feature, geoDataQuery.result.context),
    [getGeographyProps, geoDataQuery.result?.context],
  )

  return (
    <Flex
      gap="2"
      direction="row"
      alignItems="flex-end"
      style={{
        position: 'relative',
      }}
      onMouseLeave={() => setHoveredGeo(null)}
    >
      <div
        ref={tooltip.refs.setReference}
        style={{
          position: 'relative',
          ...style,
          width,
          height,
        }}
      >
        {geoDataQuery.status === 'error' && (
          <ErrorDisplay error={geoDataQuery.error} />
        )}
        {geoDataQuery.status === 'loading' && <Loading children={loading} />}
        {geoDataQuery.status === 'success' && (
          <>
            <MapInnerMemo
              width={width}
              height={height}
              projection={geoDataQuery.result.context.projection}
              geoJsonData={geoDataQuery.result.geoJson}
              getGeographyProps={_getGeographyProps}
              onSetHoveredGeo={setHoveredGeo}
            >
              {children}
            </MapInnerMemo>
          </>
        )}
        {tooltipContents && (
          <Tooltip
            ref={tooltip.refs.setFloating}
            style={tooltip.floatingStyles}
            arrowRef={tooltip.arrowRef}
            context={tooltip.context}
            getFloatingProps={tooltip.getFloatingProps}
          >
            {tooltipContents}
          </Tooltip>
        )}
      </div>
    </Flex>
  )
}
