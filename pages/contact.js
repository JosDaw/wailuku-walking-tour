import { addDoc, Timestamp, collection } from 'firebase/firestore'
import Head from 'next/head'
import { useState } from 'react'
import LoadingSpinner from '../components/universal/loading-spinner'
import { database } from '../config/firebase'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    setIsSaving(true)
    if (email === '' || message === '' || name === '') {
      setErrorMsg('Please complete all of the input boxes to continue.')
    } else {
      try {
        await addDoc(collection(database, 'contact_form'), {
          email,
          name,
          message,
          dateCreated: Timestamp.now(),
        }).then(function (docRef) {
          setIsComplete(true)
        })
      } catch (err) {
        setIsSaving(false)
        setErrorMsg(err.message)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Contact | Wailuku Walking Tour</title>
      </Head>
      <div className="px-4 flex flex-col">
        <header className="m-2">
          <h1 className="text-3xl text-primary font-bold my-4">Contact</h1>
          <h3 className="text-lg">SmallTownBig@smalltownbig.org</h3>
          <h3 className="text-lg">808-123-5678</h3>
        </header>
        <div>
          {isComplete ? (
            <div>
              <h3 className="text-2xl text-warning text-center">
                Thank you for submitting a message! We will reply to you soon!{' '}
              </h3>
            </div>
          ) : (
            <>
              <div className="flex flex-col my-2">
                <input
                  type="text"
                  placeholder="Name"
                  disabled={isSaving}
                  className="input input-bordered w-full max-w-xs"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </div>

              <div className="flex flex-col my-2">
                <input
                  type="email"
                  placeholder="Email"
                  disabled={isSaving}
                  className="input input-bordered w-full max-w-xs"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>

              <div className="flex flex-col my-2">
                <textarea
                  className="textarea textarea-bordered"
                  disabled={isSaving}
                  placeholder="Message"
                  defaultValue={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                  }}
                ></textarea>
              </div>

              {isSaving ? (
                <LoadingSpinner text="Saving" />
              ) : (
                <button
                  className="btn btn-secondary w-full my-4 text-white text-2xl font-bold"
                  onClick={handleSubmit}
                >
                  Send Message
                </button>
              )}
            </>
          )}
        </div>

        {errorMsg && (
          <h3 className="font-bold text-xl text-center">{errorMsg}</h3>
        )}
      </div>
    </>
  )
}
