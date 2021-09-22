import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Map from './components/Map.js'
import EventPopup from './components/EventPopup.js'
import SidePanel from './components/SidePanel.js'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [data, setData] = useState()
  const [tagFilter, setTagFilter] = useState([])
  const [event, setEvent] = useState()

  const createHook = (url) => () => {
    console.log('Loading from source: ' + url)
    axios
      .get(url)
      .then(response => setData(response.data))
  }

  useEffect(createHook('v2/activities'), []) // TODO: Look at different v2 data sources once available

  const validatedData = data?.rows.filter((row) => row.address.location != null)
  const allTags = validatedData?.map((row) => row.tags).flat()
  const uniqueTags = [...new Set(allTags)]

  const filteredData = (tagFilter.length == 0) ? validatedData : validatedData?.filter((row) => row.tags.some((tag) => tagFilter.includes(tag)))

  return (
  <div style={{position: 'relative', height: '100%', width: '100%', zIndex: 0}}>
    <SidePanel tags={uniqueTags} tagFilter={tagFilter} setTagFilter={setTagFilter} />
    <EventPopup event={event} setEvent={setEvent}/>
    <Map filteredData={filteredData} setEvent={setEvent}/>
  </div>
)}

export default App