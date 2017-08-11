import React, { PropTypes } from 'react'

const Filters = ({
  filters,
  categories,
  onFilterFolderChange,
  onFilterTextSubmit
}) => {
  return (
    <div className="filters">
      <select
        className="filters__folder"
        onChange={onFilterFolderChange}
        value={filters.folder}>
          <option value="All">Show All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
      </select>
      <form
        className="filters__text"
        onSubmit={onFilterTextSubmit}>
          <input
            className="filters__text__input"
            name="filters__text"
            type="text"
            defaultValue={filters.q}
            placeholder="Search for a sender..."/>
      </form>
    </div>
  )
}

Filters.propTypes = {
  filters: PropTypes.object,
  categories: PropTypes.array,
  onFilterFolderChange: PropTypes.func,
  onFilterTextSubmit: PropTypes.func
}

export default Filters