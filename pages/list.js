import { useEffect, useState } from 'react'
import { database } from '../config/firebase'
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore'
import Filter from '../components/map/filter'
import toCapitalise from '../hooks/toCapitalise'
import { useRouter } from 'next/router'
import PlaceModal from '../components/map/place-modal'
import ListCards from '../components/list-cards'

export default function List() {
  const [isLoadedMarkers, setIsLoadedMarkers] = useState(false)
  const [markersList, setMarkersList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updateList, setUpdateList] = useState(false)
  const [activePlace, setActivePlace] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const router = useRouter()

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
              info: item.data().info,
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
   * Handle Filter Queries
   * @param {string} type
   * @param {string} content
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
              info: item.data().info,
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

    setUpdateList(!updateList)
  }

  /**
   * Handle the marker popup function
   * @param {string} id
   */
  const handleMarker = (id) => {
    setActivePlace(id)
    setIsModalOpen(true)
  }

  return (
    <>
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
      <div className="flex flex-col">
        <Filter
          handleFilterQuery={handleFilterQuery}
          existingFilter={activeFilter}
        />
        {isLoadedMarkers &&
          markersList.map((place, index) => {
            return (
              <ListCards
                place={place}
                key={`indivPlaceCard${index}${updateList}`}
                handleMarker={handleMarker}
              />
            )
          })}
      </div>
    </>
  )
}
