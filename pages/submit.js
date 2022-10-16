import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Record from '../components/record'
import { database, storage } from '../config/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import LoadingSpinner from '../components/universal/loading-spinner'

export default function Submit() {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [recordingURL, setRecordingURL] = useState('')
  const [story, setStory] = useState('')
  const [selectedPlacesId, setSelectedPlacesId] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoadedPlaces, setIsLoadedPlaces] = useState(false)
  const [placesList, setPlacesList] = useState([])

  /**
   * Get Place Names + ideas
   */
  useEffect(() => {
    function getPlaces() {
      getDocs(collection(database, 'places')).then((data) => {
        setPlacesList(
          data.docs.map((item) => {
            return {
              id: item.id,
              placeName: item.data().placeName,
            }
          }),
        )
        setSelectedPlacesId(data.docs[0].id)
      })
      setIsLoadedPlaces(true)
    }

    if (!isLoadedPlaces) {
      getPlaces()
    }
  }, [isLoadedPlaces])

  /**
   * Set Image
   */
  function handleFileChange(e) {
    setImage(e.target.files[0])
  }

  /**
   * Upload Image
   */
  const handleImageUpload = () => {
    setErrorMsg('')
    setIsUploading(true)
    if (image) {
      const storageRef = ref(storage, `user_stories/${image.name}`)
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          )
        },
        (error) => {
          setErrorMsg(error.message)
          setIsUploading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImageURL(downloadURL)
            setIsUploading(false)
          })
        },
      )
    } else {
      setErrorMsg('Please choose a file')
      setIsUploading(false)
    }
  }

  /**
   * Handle Submit
   */
  const handleSubmit = async () => {
    setErrorMsg('')
    setIsSaving(true)
    try {
      await addDoc(collection(database, 'user_stories'), {
        name: name || 'Anonymous',
        placesId: selectedPlacesId,
        photoLink: imageURL || null,
        recordingLink: recordingURL || null,
        story,
        dateCreated: Timestamp.now(),
      }).then(function (docRef) {
        setIsSaving(false)
        setIsComplete(true)
      })
    } catch (err) {
      setIsSaving(false)
      setErrorMsg(err.message)
    }
  }

  /**
   * Upload audio
   */
  const handleAudioUpload = (audioFile) => {
    setErrorMsg('')
    setIsUploading(true)
    if (audioFile) {
      const storageRef = ref(storage, `user_stories/${audioFile.name}`)
      const uploadTask = uploadBytesResumable(storageRef, audioFile)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          )
        },
        (error) => {
          setErrorMsg(error.message)
          setIsUploading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setRecordingURL(downloadURL)
            setIsUploading(false)
          })
        },
      )
    }
  }

  return (
    <div className="px-4 py-4">
      <Head>
        <title>Stories | Wailuku Walking Tour</title>
      </Head>

      <div className="min-h-full flex flex-col">
        <div>
          <h1 className="text-3xl text-primary text-center font-bold mt-3">
            Community Stories
          </h1>
          <p className="font-light mt-2">
            Share your unique perspective, family history, or personal
            experience with this place!
          </p>
          <p className="font-light mt-2">Record or write your story below.</p>

          {isComplete ? (
            <h3 className="m-4 text-xl text-primary font-semibold">
              Thank you for sharing your story!
            </h3>
          ) : (
            <>
              {' '}
              <div>
                <Record
                  handleAudioUpload={handleAudioUpload}
                  recordingURL={recordingURL}
                />
              </div>
              <div className="mt-4">
                <h3 className="font-bold mb-2">Choose a Place</h3>
                <select
                  className={`input input-bordered w-full max-w-xs mb-2 font-light`}
                  onChange={(e) => {
                    setSelectedPlacesId(e.target.value)
                  }}
                >
                  {placesList.map((place, index) => {
                    return (
                      <option key={`places${index}`} value={place.id}>
                        {place.placeName}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <textarea
                  className="mt-2 input input-bordered w-full max-w-xs px-3 py-2 font-light"
                  placeholder="Write your story..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                ></textarea>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full max-w-xs font-light"
                  />
                </div>
                <div className="mt-3">
                  <div className="form-control">
                    <div className="input-group">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="input input-bordered w-full max-w-xs px-3 py-2 font-light"
                      />
                      {isUploading ? (
                        <LoadingSpinner text="Uploading" />
                      ) : (
                        <button className="btn" onClick={handleImageUpload}>
                          Upload
                        </button>
                      )}
                    </div>
                    {imageURL && (
                      <p className="text-primary font-bold">Image Uploaded</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                {isSaving ? (
                  <LoadingSpinner text="Submitting" />
                ) : (
                  <button className="btn btn-info mt-5" onClick={handleSubmit}>
                    Submit
                  </button>
                )}
                {errorMsg && (
                  <h3 className="font-bold text-center mt-3">{errorMsg}</h3>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
