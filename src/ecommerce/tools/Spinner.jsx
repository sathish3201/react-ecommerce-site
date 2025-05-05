import React from 'react'

const Spinner = () => {
  return (
      <div className="spinner">
    <div className='container spinner-adjust'>
      <div className="spinner-grow text-primary" role='status'>
            <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-secondary" role='status'>
            <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-success" role='status'>
            <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-danger" role='status'>
            <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-info" role='status'>
            <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-light" role='status'>
            <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-dark" role='status'>
            <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    </div>
  )
}

export default Spinner
