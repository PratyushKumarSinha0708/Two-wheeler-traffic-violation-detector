import React from 'react'
import Upload from './Upload'
import Result from './Result'
import { useState } from 'react'

function Dashboard() {
  const [result,setResult] = useState(null)
  const [btnClicked, setBtnClicked]= useState(false)

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-upload">
          <Upload setResult={setResult} setBtnClicked={setBtnClicked}/>
        </div>
        <div className="dashboard-result">
          <Result result={result} btnClicked={btnClicked}/>
        </div>
      </div>
    </>
  )
}

export default Dashboard
