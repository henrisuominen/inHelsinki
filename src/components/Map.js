import React from 'react';
import GoogleMapReact from 'google-map-react'
import dotenv from 'dotenv'

dotenv.config()

const APIkey = process.env.REACT_APP_MAP_API_KEY

const Marker = ({handleMarkerClick}) => {
  const MARKER_SIZE = '30'
  return(
    <div onClick={handleMarkerClick} style={{transform: 'translate(-' + MARKER_SIZE/2 + 'px, -' + MARKER_SIZE + 'px)'}} >
      <img src="./images/mapMarkerOnRing.png" alt='missing' width={MARKER_SIZE + 'px'} height={MARKER_SIZE + 'px'} />
    </div>
  )
}

const Map = ({filteredData, setEvent}) => {
  const handleMarkerClick = (row) => {
    setEvent(row)
  }

  const markers = filteredData?.map((row) => (
    <Marker
      key={row.id}
			handleMarkerClick={() => handleMarkerClick(row)} 
			// Add random shift to the markers, a hacky solution to deal with multiple markers at the same location
      lat={row.address.location.lat + parseInt(row.id.substr(0, 4), 16)/655350000}
			lng={row.address.location.long + parseInt(row.id.substr(4, 4), 16)/655350000}
    />
  ))

  return(
    <div style={{height: '100vh', width: '100%' }}>
      <GoogleMapReact
				bootstrapURLKeys={{key: APIkey}}
        defaultCenter={{lat: 60.17, lng: 24.92}}
				defaultZoom={12}
				options={{mapId: '150bc43f5c6d3b0a'}}
      >
				{markers}
      </GoogleMapReact>
    </div>
  )
}

export default Map
