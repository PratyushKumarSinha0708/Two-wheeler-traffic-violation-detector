import React from 'react'
import Upload from './Upload'
import Result from './Result'

function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-upload">
          <Upload />
        </div>
        <div className="dashboard-result">
          <Result />
        </div>
      </div>
    </>
  )
}

export default Dashboard
