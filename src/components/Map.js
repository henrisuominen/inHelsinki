import React, { useState, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import useSupercluster from 'use-supercluster'

require('dotenv').config()

const APIkey = process.env.REACT_APP_MAP_API_KEY

const Marker = ({ handleMarkerClick }) => {
  const MARKER_SIZE = '30'
  return (
    <div onClick={handleMarkerClick} style={{ transform: `translate(-${MARKER_SIZE / 2}px, -${MARKER_SIZE}px)` }}>
      <img src="./images/mapMarkerOnRing.png" alt="missing" width={MARKER_SIZE + 'px'} height={MARKER_SIZE + 'px'} />
    </div>
  )
}

const Map = ({ filteredData, setEvent }) => {
  const mapRef = useRef()
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(10)

  const handleMarkerClick = (row) => {
    setEvent(row)
  }

  const points = filteredData.map((row) => ({
    type: 'rowPoint',
    properties: { cluster: false, pointId: row.id, row },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(row.address.location.long),
        parseFloat(row.address.location.lat)
      ]
    }
  }))

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  })

  const adjustMapBounds = ({ zoom, bounds }) => {
    setZoom(zoom)
    setBounds([
      bounds.nw.lng,
      bounds.se.lat,
      bounds.se.lng,
      bounds.nw.lat
    ])
  }

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: APIkey }}
        defaultCenter={{ lat: 60.16, lng: 24.92 }}
        defaultZoom={13}
        options={{ mapId: '150bc43f5c6d3b0a' }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => { mapRef.current = map }}
        onChange={adjustMapBounds}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties

          const clusterDim = 20 + (pointCount / points.length) * 20

          const onClusterZoom = () => {
            const expansionZoom = Math.min(
              supercluster.getClusterExpansionZoom(cluster.id),
              25
            )
            mapRef.current.setZoom(expansionZoom)
            mapRef.current.panTo({ lat: latitude, lng: longitude })
          }

          if (isCluster) {
            return (
              <div
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: clusterDim + 'px',
                    height: clusterDim + 'px',
                    transform: `translate(-${clusterDim / 2}px, -${clusterDim / 2}px)`
                  }}
                  onClick={onClusterZoom}
                >
                  {pointCount}
                </div>
              </div>
            )
          }

          return (
            <Marker
              key={`point-${cluster.properties.pointId}`}
              handleMarkerClick={() => handleMarkerClick(cluster.properties.row)}
              // Shift points at identical locations
              lat={latitude + parseInt(cluster.properties.row.id.substr(0, 4), 16) / 655350000}
              lng={longitude + parseInt(cluster.properties.row.id.substr(4, 4), 16) / 655350000}
            />
          )
        })}
      </GoogleMapReact>
    </div>
  )
}

export default Map
