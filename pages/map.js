import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { database } from '../config/firebase'
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore'
import Markers from '../components/map/markers'
import Filter from '../components/map/filter'
import toCapitalise from '../hooks/toCapitalise'
import Head from 'next/head'
import UserMarker from '../components/map/user-marker'
import UserLocation from '../components/map/user-location'
import { useRouter } from 'next/router'
import PlaceModal from '../components/map/place-modal'
import getMapRoute from '../hooks/getMapRoute'

export default function Map() {
  const [center, setCenter] = useState({ lat: 20.887944, lng: -156.501974 })
  const [zoom, setZoom] = useState(15)
  const [isLoadedMarkers, setIsLoadedMarkers] = useState(false)
  const [markersList, setMarkersList] = useState([])
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })
  const [showUserLocation, setShowUserLocation] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activePlace, setActivePlace] = useState(null)
  const [status, setStatus] = useState('')
  const [updateMap, setUpdateMap] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const router = useRouter()

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
              id: item.id,
              placeName: item.data().placeName,
              type: item.data().type,
              coordinates: item.data().coordinates,
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
   * @param {string} id
   */
  const handleMarker = (id) => {
    setActivePlace(id)
    setIsModalOpen(true)
  }

  /**
   * Handle Filter Queries
   * @param {string} type
   * @param {string} content
   * TODO: All not filtering properly
   */
  const handleFilterQuery = (type, content) => {
    setActiveFilter(content)
    let lowerCaseQuery = content.toLowerCase()
    let firstCharQuery = toCapitalise(content)
    let thisAllPlaces = markersList

    if (content === 'All') {
      router.reload()
    }

    if (type === 'type') {
      const placeRef = query(
        collection(database, 'places'),
        where('type', '==', lowerCaseQuery),
      )
      onSnapshot(placeRef, async (snapshot) => {
        setMarkersList(
          snapshot.docs.map((item) => {
            return {
              id: item.id,
              placeName: item.data().placeName,
              type: item.data().type,
              coordinates: item.data().coordinates,
            }
          }),
        )
      })
    } else if (type === 'search') {
      let matchingTagIds = []
      const dbInfoInstance = collection(database, 'places')
      const typeRef = query(dbInfoInstance)
      onSnapshot(typeRef, (snapshot) => {
        snapshot.docs.map((doc) => {
          const typeString = doc.data().type
          const placeNameString = doc.data().placeName.toLowerCase()
          if (
            placeNameString.includes(lowerCaseQuery) ||
            placeNameString.includes(content) ||
            typeString.includes(content) ||
            typeString.includes(firstCharQuery) ||
            typeString.includes(lowerCaseQuery)
          ) {
            matchingTagIds.push(doc.id)
          }
        })

        let showResults = thisAllPlaces.filter((o1) =>
          matchingTagIds.some((o2) => o1.id === o2),
        )
        let hideResults = thisAllPlaces.filter(
          (o1) => !matchingTagIds.some((o2) => o1.id === o2),
        )
        showResults.forEach((element) => {
          element.hide = false
        })
        hideResults.forEach((element) => {
          element.hide = true
        })

        let finalArray = hideResults.concat(showResults)
        setMarkersList(finalArray)
      })
    }

    setUpdateMap(!updateMap)
  }

  /**
   * Get user location coordinates from browser
   * Center map on that location
   * Zoom in
   */
  const handleUserLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Sorry, geolocation is not supported by your browser')
    } else {
      setStatus('Locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus('')
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setShowUserLocation(true)
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setZoom(15)
        },
        () => {
          setStatus(
            'Sorry, we were unable to retrieve your location. Please check your privacy settings to allow location tracking on this browser.',
          )
        },
      )
    }
  }

  /**
   * Centralise map + zoom to a particular id
   * @param thisId
   */
  const zoomToMarker = (thisId) => {
    const findInfoPos = markersList.map((e) => e.id).indexOf(thisId)
    const findGeocode = markersList[findInfoPos].generalLocation
    setCenter({ lat: findGeocode.latitude, lng: findGeocode.longitude })
    setZoom(17)
  }

  /**
   * User marker zoom function
   */
  const zoomToUser = () => {
    setCenter({ lat: userLocation.lat, lng: userLocation.lng })
    setZoom(18)
  }

  /**
   * Google Map route
   * @param {*} map
   * @param {*} maps
   * TODO: fix route
   */
  const apiIsLoaded = (map, maps) => {
    if (activeFilter !== 'All') {
      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer()
      directionsRenderer.setMap(map)

      let mapRoute = getMapRoute(activeFilter)
      let origin = mapRoute.origin
      let destination = mapRoute.destination
      let waypoints = mapRoute.waypoints

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.WALKING,
          waypoints: waypoints,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result)
          } else {
            console.error(result)
          }
        },
      )
    }
  }

  return (
    <>
      <Head>
        <title>Map | Wailuku Walking Tour</title>
      </Head>

      {activePlace !== null && (
        <PlaceModal
          isModalOpen={isModalOpen}
          handleCloseModal={() => {
            setIsModalOpen(false)
            setActivePlace(null)
          }}
          placeId={activePlace}
        />
      )}
      <div>
        <Filter handleFilterQuery={handleFilterQuery} />
        <div style={{ height: '100vh', width: '100%' }} className="relative">
          <GoogleMapReact
            bootstrapURLKeys={{ key: mapsKey }}
            center={center}
            zoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            key={updateMap}
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
                  hide={marker.hide}
                />
              ))}
            {showUserLocation && (
              <UserMarker
                lat={userLocation.lat}
                lng={userLocation.lng}
                zoomToUser={zoomToUser}
              />
            )}
          </GoogleMapReact>
          <UserLocation
            handleUserLocation={handleUserLocation}
            status={status}
          />
        </div>
      </div>
    </>
  )
}
