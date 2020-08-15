import { useContext, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'

import MapContext from './MapContext'

const MapControl = ({ children, className, position }) => {
  const container = useMapboxControl(className, position)
  return ReactDOM.createPortal(children, container)
}

export default MapControl

const useMapboxControl = (
  className,
  position,
  mapboxClassName = 'mapboxgl-ctrl'
) => {
  const map = useContext(MapContext)
  const container = useMemo(() => document.createElement('div'), [])

  const control = useMemo(
    () => ({
      onAdd() {
        // `mapboxgl-ctrl` needed for click events:
        // https://stackoverflow.com/questions/51681771/how-to-create-my-custom-control-with-event-in-mapboxgl
        container.classList.add(mapboxClassName)
        if (className) {
          container.classList.add(className)
        }

        return container
      },
      onRemove() {
        container.classList.remove(mapboxClassName)
        if (className) {
          container.classList.remove(className)
        }
      },
    }),
    [className, container, mapboxClassName]
  )

  useEffect(() => {
    if (map) {
      map.addControl(control, position)
    }

    return () => {
      if (map) {
        map.removeControl(control)
      }
    }
  }, [map, control, position])

  return container
}
