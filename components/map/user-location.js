import React from 'react'
import { IoMdLocate } from 'react-icons/io'

const UserLocation = ({ handleUserLocation, status }) => {
  return (
    <div className="absolute left-0 bottom-10">
      <button
        className="btn btn-success btn-outline btn-circle"
        onClick={handleUserLocation}
      >
        <IoMdLocate size={30} />
      </button>
      {status && (
        <p className="text-lg my-2 text-center text-success font-bold">
          {status}
        </p>
      )}
    </div>
  )
}

export default UserLocation
