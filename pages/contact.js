import { addDoc, Timestamp, collection } from 'firebase/firestore'
import Head from 'next/head'
import { useState } from 'react'
import LoadingSpinner from '../components/universal/loading-spinner'
import { database } from '../config/firebase'
import { MdEmail } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'

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
        <header className="m-2 mb-4">
          <h1 className="text-3xl text-primary font-bold my-4">Contact</h1>
          <div className="flex mb-2">
            <MdEmail className="mr-2 text-primary" />
            <h3 className="text-sm">SmallTownBig@smalltownbig.org</h3>
          </div>
          <div className="flex">
            <BsTelephoneFill className="mr-2 text-primary" />
            <h3 className="text-sm">808-123-5678</h3>
          </div>
        </header>
        <div>
          {isComplete ? (
            <div>
              <h3 className="text-xl text-warning text-center">
                Thank you for submitting a message! We will reply to you soon!{' '}
              </h3>
            </div>
          ) : (
            <>
              <div className="flex flex-col mb-3">
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
                  className="input input-bordered w-full max-w-xs font-light"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>

              <div className="flex flex-col my-2">
                <textarea
                  className="mt-2 textarea textarea-bordered w-full max-w-xs px-3 py-2 font-light"
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
                  className="btn btn-neutral w-full my-4"
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
