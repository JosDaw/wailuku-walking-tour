import { getDoc, doc, onSnapshot, collection, where, query } from 'firebase/firestore'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {FaTimes} from 'react-icons/fa'
import { database } from '../../config/firebase'
import MarkdownText from '../universal/markdown-text'

/**
 * TODO: audio play
 * TODO: multiple photos should show as carousel
 * TODO: user stories section
 */
const PlaceModal = ({isModalOpen, handleCloseModal, placeId}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [placeInfo, setPlaceInfo] = useState({})
  const [placePhotos, setPlacePhotos] = useState([])
  const [userStories, setUserStories] = useState([])

  /**
   * Fetch place information
   */
   useEffect(() => {
    async function getInformation() {
      //Get information by id
      const docRef = doc(database, "places", placeId);
      const docSnap = await getDoc(docRef)
      setPlaceInfo(docSnap.data())

        //Get photos by id
        const photosRef = query(
          collection(database, 'photos'),
          where('placesId', '==', placeId),
        )
        onSnapshot(photosRef, async (snapshot) => {
          setPlacePhotos(
            snapshot.docs.map((item) => {
              return {
                id: item.id,
                link: item.data().link
              }
            }),
          )
        })

        //Get user stories by id
        const userStoriesRef = query(
          collection(database, 'user_stories'),
          where('placesId', '==', placeId),
        )
        onSnapshot(userStoriesRef, async (snapshot) => {
          setUserStories(
            snapshot.docs.map((item) => {
              return {
                id: item.id,
                name: item.data().name,
                link: item.data().photoLink,
                recordingLink: item.data().recordingLink,
                story: item.data().story
              }
            }),
          )
        })
      setIsLoaded(true)
    }

    if (!isLoaded) {
      getInformation()
    }
  }, [isLoaded, placeId])
  
  
  return (
    <div className={`modal ${isModalOpen ? 'modal-open' :'modal-close'}`}>
      <div className="modal-box relative">
        <button
          className="btn btn-square btn-neutral btn-sm absolute right-2 top-2"
          onClick={handleCloseModal}
        >
          <FaTimes size={25}/>
        </button>
        {isLoaded && 
        <div className='flex flex-col justify-center items-center'>
          {placePhotos && placePhotos.map((photo, index) =>{ 
            const myLoader = ({}) => {
              return photo.link
            }
            return <Image
            loader={myLoader}
            src={photo.link}
            alt={placeInfo.placeName}
            width={250}
            height={350}
            unoptimized={true}
            key={`placeImage${index}`} 
            className="rounded-lg"
          />
          })}
          <h1 className='text-3xl font-bold text-primary text-center my-2'>{placeInfo.placeName}</h1>
          <MarkdownText content={placeInfo.info}/>
        </div>
        }
      </div>
      
    
      
    </div>
  )
}

export default PlaceModal