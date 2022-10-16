import { useReactMediaRecorder } from 'react-media-recorder'
import { MdKeyboardVoice } from 'react-icons/md'
import { BsStopCircleFill, BsRecordCircleFill } from 'react-icons/bs'

const Record = () => {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true },
  )

  return (
    <div className="mt-4 flex flex-col items-center">
      <audio src={mediaBlobUrl} controls autoPlay />
      <p className="font-light my-3">Press the microphone to record.</p>
      <div className="flex gap-x-2">
        <button
          onClick={startRecording}
          className="btn-secondary"
          style={{ borderRadius: '25px', padding: '8px' }}
        >
          <MdKeyboardVoice size={24} className="text-white" />
        </button>
        <button onClick={stopRecording}>
          <BsStopCircleFill size={40} className="text-secondary" />
        </button>
      </div>
    </div>
  )
}

export default Record
