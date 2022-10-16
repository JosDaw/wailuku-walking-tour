import { useReactMediaRecorder } from 'react-media-recorder'
import { MdKeyboardVoice } from 'react-icons/md'
import { BsStopCircleFill } from 'react-icons/bs'
import { useState } from 'react'
import { Timestamp } from 'firebase/firestore'

const Record = ({ handleAudioUpload, recordingURL }) => {
  const [isRecording, setIsRecording] = useState(false)
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true },
  )

  /**
   * Send recording as file to Submit
   */
  const handleConvertMediaBlob = async () => {
    const mediaBlob = await fetch(mediaBlobUrl).then((response) =>
      response.blob(),
    )

    const myFile = new File([mediaBlob], Timestamp.now().seconds.toString(), {
      type: 'audio/mpeg',
    })

    handleAudioUpload(myFile)
  }

  return (
    <div className="mt-4 flex flex-col items-center">
      <audio src={mediaBlobUrl} controls autoPlay />
      <p className="font-light my-3">Press the microphone to record.</p>
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            startRecording()
            setIsRecording(true)
          }}
          className={`btn-secondary ${isRecording ? 'opacity-50' : ''}`}
          disabled={isRecording}
          style={{ borderRadius: '25px', padding: '8px' }}
        >
          <MdKeyboardVoice size={24} className="text-white" />
        </button>
        <button
          className={`${!isRecording ? 'opacity-50' : ''}`}
          onClick={() => {
            stopRecording()
            setIsRecording(false)
          }}
          disabled={!isRecording}
        >
          <BsStopCircleFill size={40} className="text-secondary" />
        </button>
      </div>

      <div className="text-center">
        <button className="btn my-2" onClick={handleConvertMediaBlob}>
          Upload Audio
        </button>
        {recordingURL && (
          <p className="text-primary font-bold">Audio Uploaded</p>
        )}
      </div>
    </div>
  )
}

export default Record
