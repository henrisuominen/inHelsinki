import React, { useState } from 'react'

const FilterButton = ({ tag, tagFilter, setTagFilter }) => {
	const [active, setActive] = useState(false)

	const handleTagClick = (tag) => {
		if (tagFilter.some((filterTag) => filterTag === tag)) {
			setTagFilter(tagFilter.filter(filterTag => filterTag !== tag))
			setActive(false)
		} else {
			setTagFilter(tagFilter.concat(tag))
			setActive(true)
		}
	}

	return (
		<div className={'filterButton' + (active ? ' active' : '')} onClick={() => handleTagClick(tag)}>
			{tag.replaceAll("_", " ")}
		</div>
	)
}

export default FilterButton