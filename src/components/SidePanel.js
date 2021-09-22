import React from 'react'
import FilterButton from './FilterButton.js'

const SidePanel = ({ tags, tagFilter, setTagFilter, type }) => (
	<div className='sidePanel' >
		<h2 className='tagTitle'>Helsinki Activities</h2>
		<div className='filterButton'>
			This page displays activities available in Helsinki! 
			It uses information from MyHelsinki Open API. {/*https://open-api.myhelsinki.fi*/}
			Please press the tags below to apply a filter.
		</div>
		<h2 className='tagTitle'>Filter With Tags</h2>
		{tags.map((tag, i) =>
			<FilterButton key={i} tag={tag} tagFilter={tagFilter} setTagFilter={setTagFilter} />
		)}
	</div>
)

export default SidePanel