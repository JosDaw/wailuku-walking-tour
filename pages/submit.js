import Head from 'next/head'
import { useState } from 'react'
import Record from '../components/record'

export default function Submit() {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

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
          <p className="font-light mt-2">Record or write your story below</p>
          <div>
            <Record />
          </div>
        </div>
        <div>
          <textarea
            className="mt-2"
            placeholder="Write your story..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Image (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-info mt-4">Submit</button>
      </div>
    </div>
  )
}
