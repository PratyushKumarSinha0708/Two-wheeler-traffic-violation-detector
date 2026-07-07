import React from 'react'
import Button from '@mui/material/Button'

function Result() {

  const ImageUrl = "/Screenshot 2026-07-05 164654.png"
  return (
    <>
      <div className="result-container">
        <div className="result-image">
          <img src={ImageUrl} alt="Detected Violations" />
        </div>
        <div className="result-violations">
          <div><h3>Detected Violations:</h3></div>
          <div className='violations-list'>

            <p>No Helmet</p>
            <p>Tripple Riding</p>

          </div>
        </div>
      </div>
      <div className="download-result-image">
        <Button variant="contained" size='small'>Download</Button>
      </div>
    </>
  )
}

export default Result
