import { Timestamp } from 'firebase/firestore'

export default function getTimeSince(dateTime) {
  const date = new Timestamp(dateTime.seconds, dateTime.nanoseconds).toDate()

  let seconds = Math.floor((new Date() - date) / 1000)
  let interval = seconds / 31536000
  let timeName = ''

  if (interval > 1) {
    timeName = Math.floor(interval) === 1 ? ' year' : 'years'
    return Math.floor(interval) + timeName
  }
  interval = seconds / 2592000
  if (interval > 1) {
    timeName = Math.floor(interval) === 1 ? ' month' : ' months'
    return Math.floor(interval) + timeName
  }
  interval = seconds / 86400
  if (interval > 1) {
    timeName = Math.floor(interval) === 1 ? ' day' : ' days'
    return Math.floor(interval) + timeName
  }
  interval = seconds / 3600
  if (interval > 1) {
    timeName = Math.floor(interval) === 1 ? ' hour' : ' hours'
    return Math.floor(interval) + timeName
  }
  interval = seconds / 60
  if (interval > 1) {
    timeName = Math.floor(interval) === 1 ? ' minute' : ' minutes'
    return Math.floor(interval) + timeName
  }
  return Math.floor(seconds) + ' seconds'
}
