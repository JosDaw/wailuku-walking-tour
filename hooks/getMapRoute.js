export default function getMapRoute(type) {
  let origin = { lat: 20.889359, lng: -156.502371 }
  let destination = { lat: 20.886973, lng: -156.50259 }
  let waypoints = { location: new google.maps.LatLng(20.887982, -156.501485) }

  switch (type) {
    case 'Art':
      origin = { lat: 20.889359, lng: -156.502371 }
      destination = { lat: 20.886973, lng: -156.50259 }
      waypoints = [{ location: new google.maps.LatLng(20.887982, -156.501485) }]
      return { origin, destination, waypoints }

    case 'History':
      origin = { lat: 20.886943, lng: -156.504834 }
      destination = { lat: 20.885743, lng: -156.507159 }
      waypoints = [{ location: new google.maps.LatLng(20.886123, -156.505252) }]
      return { origin, destination, waypoints }

    case 'Culture':
      origin = { lat: 20.88544, lng: -156.50753 }
      destination = { lat: 20.883298, lng: -156.534692 }
      waypoints = [{ location: new google.maps.LatLng(20.888317, -156.504284) }]
      return { origin, destination, waypoints }

    default:
      origin = { lat: 20.889359, lng: -156.502371 }
      destination = { lat: 20.886973, lng: -156.50259 }
      waypoints = [{ location: new google.maps.LatLng(20.887982, -156.501485) }]
      return { origin, destination, waypoints }
  }
}
