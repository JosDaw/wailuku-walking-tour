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

export default function List() {
  const [isLoadedMarkers, setIsLoadedMarkers] = useState(false)
  const [markersList, setMarkersList] = useState([])
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
   * TODO: All not filtering properly
   */
  const handleFilterQuery = (type, content) => {
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
  }

  return (
    <div>
      <Filter handleFilterQuery={handleFilterQuery} />
      {isLoadedMarkers &&
        markersList.map((place, index) => {
          return <div key={`indivPlace${index}`}> {place.placeName} </div>
        })}
    </div>
  )
}
