import Image from 'next/image'
import getTimeSince from '../../hooks/getTimeSince'
import AudioPlayer from '../universal/audio-player'

const Story = ({ story }) => {
  const myLoader = ({}) => {
    return story.link
  }

  return (
    <div className="bg-white max-w-xl rounded-2xl px-2 py-4 shadow-lg hover:shadow-2xl transition duration-500 mt-4 flex flex-col items-center">
      {story.link && (
        <div className="my-2">
          <Image
            loader={myLoader}
            src={story.link}
            alt={`Story by ${story.name}`}
            width={250}
            height={350}
            unoptimized={true}
            className="rounded-lg"
          />
        </div>
      )}
      {story.recordingLink && <AudioPlayer url={story.recordingLink} />}
      {story.story && (
        <p className="text-md text-gray-600 pb-1">{story.story}</p>
      )}
      <p className="font-semibold text-left w-full">{story.name} </p>
      <p className="text-sm text-slate-500 text-left w-full">
        Submitted about {getTimeSince(story.dateCreated)} ago
      </p>
    </div>
  )
}

export default Story
