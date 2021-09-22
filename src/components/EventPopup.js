import React, { useState } from 'react'
import CloseButton from 'react-bootstrap/CloseButton'

const EventImage = ({media}) => {
	return(
		<img className='eventImage' src={media.smallUrl} alt={media.alt} height='30%' />
	)
}

const DisplayPrice = ({lower, upper}) => {
	var priceText = 'Price: '

	// sometimes the values are mixed up in the original dataset
	if(lower > upper) {
		[lower, upper] = [upper, lower]
	}

	if (lower === upper) {
		if (lower === 0) {
			priceText += 'Free!'
		} else {
			priceText += lower + '€'
		}
		
	} else {
		priceText += (lower.toString()  + '€' + ' - ' + upper.toString()  + '€')
	}

	return(
		<div className='price'>
			{priceText}
		</div>
	)
}

const EventSummary = ({event, userLocation}) => {
	var distance = undefined
		if(userLocation !== undefined) {
			distance = Math.sqrt((event.address.location.long - userLocation.coords.longitude)**2 + (event.address.location.lat - userLocation.coords.latitude)**2) * 111
		}
	
	return (
	<div className='eventSummary'>
		<DisplayPrice lower={event.priceEUR.from} upper={event.priceEUR.to}/>
		<div>
			Address: {event.address.streetName}
		</div>
		<div>
			Url: <a href={event.siteUrl}>{event.siteUrl}</a>
		</div>
		<div>
			Duration: {event.duration + ' ' + (event.duration < 24 ? 'h' : 'm')}
		</div>
		<div>
			Distance: {distance !== undefined ? distance.toFixed(1) + ' km': 'Please Enable Location Services To Calculate Distance'}
		</div>
	</div>
)}

const EventPopup = ({ event, setEvent }) => {
	const [userLocation, setUserLocation] = useState()

	if (event !== undefined) {
		console.log(event)

		const description = event.descriptions.en
		return (
			<div className='EventPopup'>
				<CloseButton className='popupCloseButton' onClick={() => setEvent(undefined)}/>
				<h2 >
					{description.name}
				</h2>

				<div className='description'>
					{description.description}
				</div>

				<hr></hr>

				<EventSummary event={event} userLocation={userLocation} />

				<hr></hr>
			
				<div className='tags' style={{marginTop:'20px'}}>
					{event.tags.map((tag, i) => <div key={i} className= 'filterButton active' > {tag.replaceAll("_", " ")} </div>)}
				</div>

				<hr></hr>

				<div className='eventImage'>
					{event.media.map((image, i) => <EventImage key={i} media={image} />)}
				</div>
				
			</div>
		)
	} else {
		return (
			<div>

			</div>
		)
	}
}

export default EventPopup