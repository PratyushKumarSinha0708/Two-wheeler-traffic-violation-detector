import React from 'react'
import Upload from './Upload'
import Result from './Result'
import { useState } from 'react'

function Dashboard() {
  const [result,setResult] = useState(null)

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-upload">
          <Upload setResult={setResult}/>
        </div>
        <div className="dashboard-result">
          <Result result={result}/>
        </div>
      </div>
    </>
  )
}

export default Dashboard
