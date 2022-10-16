import { useState } from "react"

export default function Contact() {
  const [name, setName] = useState('')
  return <div className="px-4">
      <header className="m-2">
        <h1 className="text-3xl text-primary font-bold my-4">Contact</h1>
        <h3 className="text-lg">SmallTownBig@smalltownbig.org</h3>
        <h3 className="text-lg">808-123-5678</h3>
      </header>
      <div>

      <div className="flex flex-col">
        <label>Name</label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={name} onChange={()=>{}}/>

      </div>

      </div>

    </div>
}
