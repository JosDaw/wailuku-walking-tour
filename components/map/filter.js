import React, { useEffect, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
const Filter = ({ handleFilterQuery, existingFilter }) => {
  const [activeFilter, setActiveFilter] = useState(existingFilter)
  const [filterQuery, setFilterQuery] = useState('')

  useEffect(() => {
    if (activeFilter !== existingFilter) {
      setActiveFilter(existingFilter)
    }
  }, [activeFilter, existingFilter])

  const handleFilter = (type, content) => {
    setActiveFilter(content)
    handleFilterQuery(type, content)
  }

  const filterButtons = () => {
    const types = ['Art', 'Culture', 'History', 'All']
    return types.map((type, index) => {
      return (
        <button
          className={`w-2/5 btn btn-primary font-bold text-lg ${
            type === activeFilter ? '' : 'btn-outline'
          } m-2`}
          key={`filterType${index}`}
          onClick={() => {
            handleFilter('type', type)
          }}
        >
          {type}
        </button>
      )
    })
  }

  return (
    <div className="flex flex-row flex-wrap justify-evenly m2-4">
      {filterButtons()}
      <div className="form-control my-2">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
            value={filterQuery}
            onChange={(e) => {
              setFilterQuery(e.target.value)
            }}
          />
          <button
            className="btn btn-square"
            onClick={() => {
              handleFilter('search', filterQuery)
            }}
          >
            <HiOutlineSearch size={25} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter
