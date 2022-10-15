import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { database } from '../config/firebase'
import {
  collection,
  getDocs,
} from 'firebase/firestore'
import Markers from '../components/map/markers'

export default function Map() {
  const [center, setCenter] = useState({lat: 20.887944, lng: -156.501974})
  const [zoom, setZoom] = useState(15)
  const [isLoadedMarkers, setIsLoadedMarkers] = useState(false)
  const [markersList, setMarkersList] = useState([])
  const [activeFilter, setActiveFilter] = useState('')

  const env = process.env.NODE_ENV
  const apikey =
    env === 'development'
      ? process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY_DEVELOPMENT
      : process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const mapsKey = apikey

  /**
 * Fetch initial markers
 */
  useEffect(() => {
    function getMarkers() {
      getDocs(collection(database, 'places')).then((data) => {
        setMarkersList(
          data.docs.map((item) => {
            return {
              id: item.data().id,
              placeName: item.data().placeName,
              type: item.data().type,
              coordinates: item.data().coordinates
            }
          }),
        )
      })
      setIsLoadedMarkers(true)
    }

    if (!isLoadedMarkers) {
      getMarkers()
    }
  }, [isLoadedMarkers])

  /**
   * Handle the marker popup function
   * @param {*} id 
   */
  const handleMarker = (id) => {
  }

  const filterButtons = () => {
    const types = ['Art', 'Culture', 'History', 'All']

    return types.map((type, index) =>{ 
      return <button className={`btn btn-primary ${type === activeFilter ? '' : 'btn-outline'} m-2`} key={`filterType${index}`}>{type}</button>
    })
  }

  return (
    <div >
      <h2 className='text-2xl'>Map</h2>
      <div className='flex flex-row flex-wrap justify-between'>
        {filterButtons()}
      </div>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapsKey }}
          center={center}
          zoom={zoom}
        >
         {isLoadedMarkers &&
          markersList.map((marker, i) => (
            <Markers
              lat={marker.coordinates.latitude}
              lng={marker.coordinates.longitude}
              handleMarkerClick={handleMarker}
              key={i}
              id={marker.id}
              type={marker.type}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  )
}
