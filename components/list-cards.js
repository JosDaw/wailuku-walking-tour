const ListCards = ({ place, handleMarker }) => {
  let placeInfo = place.info || ''
  const shortenedString = `${placeInfo.substring(0, 150)} ${
    placeInfo.length > 150 ? '...' : ''
  }`

  return (
    <div className="card mx-2 my-2 shadow-xl py-2 bg-accent relative">
      <div className="card-body">
        <h2 className="card-title">{place.placeName}</h2>
        <p>{shortenedString}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleMarker(place.id)
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListCards
