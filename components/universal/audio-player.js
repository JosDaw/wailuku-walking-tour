import { useState } from 'react'
import ReactPlayer from 'react-player'
import { HiPause, HiPlay } from 'react-icons/hi'

const AudioPlayer = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [played, setPlayed] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgress = (e) => {
    setPlayed(e.playedSeconds)
  }

  return (
    <div className="flex flex-row items-center justify-center my-2">
      <ReactPlayer
        url={url}
        playing={isPlaying}
        width="10%"
        height="10%"
        className="hidden"
        onProgress={(e) => {
          handleProgress(e)
        }}
        onDuration={(e) => {
          setDuration(e)
        }}
      />
      <div className="flex flex-col items-center justify-center rounded-xl border bg-[#F8FAFC]">
        <h3 className="text-primary font-bold">Listen Now</h3>
        <progress
          className="progress progress-secondary w-56 m-1"
          value={played}
          max={duration}
        ></progress>
        <div className="px-10 rounded-b-xl bg-control-panel-light-background flex items-center justify-between z-50 ">
          <div
            className="cursor-pointer text-secondary w-10 h-10 rounded-full m-1 bg-white shadow-xl flex items-center justify-center"
            onClick={handlePlayPause}
          >
            {!isPlaying ? <HiPlay size={35} /> : <HiPause size={35} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
