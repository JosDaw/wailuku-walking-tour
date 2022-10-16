import Image from 'next/image'
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs'

const Carousel = ({ allImages, setPhotoIndex, photoIndex, placeName }) => {
  const myLoader = ({}) => {
    return allImages[photoIndex].link
  }

  return (
    <div className="flex flex-row flex-nowrap items-center">
      <BsFillArrowLeftCircleFill
        size={30}
        className="text-primary mx-2 cursor-pointer"
        onClick={() => {
          setPhotoIndex((photoIndex + allImages.length - 1) % allImages.length)
        }}
      />

      {allImages[photoIndex] !== undefined && (
        <Image
          loader={myLoader}
          src={allImages[photoIndex].link}
          alt={placeName}
          width={250}
          height={350}
          unoptimized={true}
          className="rounded-lg"
        />
      )}
      <BsFillArrowRightCircleFill
        size={30}
        className="text-primary mx-2 cursor-pointer"
        onClick={() => {
          setPhotoIndex((photoIndex + 1) % allImages.length)
        }}
      />
    </div>
  )
}

export default Carousel
