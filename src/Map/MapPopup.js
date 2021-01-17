import { useContext, useEffect } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import ReactDOM from 'react-dom'

import { useElement } from './hooks'
import MapContext from './MapContext'

const MapPopup = ({
  // Required
  children,
  lngLat,
  // Popup options: https://docs.mapbox.com/mapbox-gl-js/api/#popup
  closeButton = false,
  closeOnClick = false,
  anchor,
  offset,
  className,
  maxWidth = '360px',
  // Misc
  tagName = 'div',
  ...props
}) => {
  const element = useElement(tagName, props)
  const map = useContext(MapContext)
  useMapboxPopup(map, element, lngLat, {
    closeButton,
    closeOnClick,
    anchor,
    offset,
    className,
    maxWidth,
  })

  return ReactDOM.createPortal(children, element)
}

export default MapPopup

const useMapboxPopup = (map, element, lngLat, options) => {
  useEffect(() => {
    if (!map) return

    const popup = new mapboxgl.Popup(options)
      .setDOMContent(element)
      .setLngLat(lngLat)
      .addTo(map)

    return () => {
      popup.remove()
    }
  }, [map, element, lngLat]) // eslint-disable-line react-hooks/exhaustive-deps
}
