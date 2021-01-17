import { useMemo, useEffect } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

export const useBounds = (coordinates, minCoordinates = 2) => {
  const bounds = useMemo(() => {
    if (!(coordinates && coordinates.length > minCoordinates)) return null

    const bounds = new mapboxgl.LngLatBounds()
    coordinates.forEach((coordinate) => bounds.extend(coordinate))
    return bounds
  }, [coordinates, minCoordinates])

  return bounds
}

export const useElement = (tagName, props) => {
  const element = useMemo(() => document.createElement(tagName), [tagName])
  useEffect(() => {
    Object.keys(props).forEach((key) => {
      if (key === 'style') {
        Object.assign(element.style, props.style)
      } else {
        element[key] = props[key]
      }
    })
  }, [element, props])

  return element
}
