import React, { useState, useEffect } from 'react'
import CloseButton from 'react-bootstrap/CloseButton'

const EventImage = ({ media }) => (
  <img className="eventImage" src={media.smallUrl} alt={media.alt} height="30%" />
)

const DisplayPrice = ({ lower, upper }) => {
  let priceText = 'Price: '

  // sometimes the values are mixed up in the original dataset
  if (lower > upper) {
    [lower, upper] = [upper, lower]
  }

  if (lower == null & upper == null) {
    return null
  } else if (lower == null | lower === upper) {
    priceText += (`${upper}€`)
  } else if (upper == null) {
    priceText += (`${lower}€`)
  } else {
    priceText += (`${lower}€` + ` - ${upper}€`)
  }

  return (
    <div className="price">
      {priceText}
    </div>
  )
}

const EventSummary = ({ event, userLocation }) => {
  let distance
  if (userLocation !== undefined) {
    distance = Math.sqrt((event.address.location.long - userLocation.coords.longitude) ** 2 + (event.address.location.lat - userLocation.coords.latitude) ** 2) * 111
  }

  return (
    <div className="eventSummary">
      <DisplayPrice lower={event.priceEUR.from} upper={event.priceEUR.to} />
      <div>
        Address: {event.address.streetName}
      </div>
      <div>
        Website: <a href={event.siteUrl}>{event.siteUrl}</a>
      </div>
      <div>
        {event.duration > 0 ? ('Duration: ' + event.duration + (event.duration < 24 ? 'h' : 'm')) : ''}
      </div>
      <div>
        Distance: {distance !== undefined ? distance.toFixed(1) + ' km' : ' Please Enable Location Services To Calculate Distance'}
      </div>
    </div>
  )
}

const EventPopup = ({ event, setEvent }) => {
  const [userLocation, setUserLocation] = useState()

  // Geolocate the user
  useEffect(() => { navigator.geolocation.getCurrentPosition((location) => { setUserLocation(location) }) })

  if (event !== undefined) {
    const description = event.descriptions.en
    return (
      <div className="EventPopup">
        <CloseButton className="popupCloseButton" onClick={() => setEvent(undefined)} />
        <h2>
          {description.name}
        </h2>

        <div className="description">
          {description.description}
        </div>

        <hr />

        <EventSummary event={event} userLocation={userLocation} />

        <hr />

        <div className="tags">
          {event.tags.map((tag, i) => (
            <div key={i} className="filterButton filterItem active">
              {('' + tag).replace(/_/g, ' ')}
            </div>
          ))}
        </div>

        <hr />

        <div className="eventImage">
          {event.media.map((image, i) => <EventImage key={i} media={image} />)}
        </div>

      </div>
    )
  }
  return (
    <div />
  )
}

export default EventPopup
