import { MdPersonPinCircle } from 'react-icons/md'

const UserMarker = ({ zoomToUser }) => {
  return (
    <>
      <div className={`indicator`} onClick={zoomToUser}>
        <MdPersonPinCircle size={35} className={'text-red-700'} />
      </div>
    </>
  )
}

export default UserMarker
