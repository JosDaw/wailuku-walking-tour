import React, { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Markers = ({ lat, lng, handleMarkerClick, key, id, type, hide }) => {
  const markerColorType = () => {
    const shrinkLocationType = type.toLowerCase()
    switch (shrinkLocationType) {
      case 'art':
        return 'text-primary'

      case 'culture':
        return 'text-info'

      case 'history':
        return 'text-secondary'

      default:
        return 'text-warning'
    }
  }

  return (
    <>
      <div
        className={`indicator ${hide ? 'hidden' : ''}`}
        onClick={() => {
          handleMarkerClick(id)
        }}
      >
        <FaMapMarkerAlt size={35} className={markerColorType()} />
      </div>
    </>
  )
}

export default Markers
