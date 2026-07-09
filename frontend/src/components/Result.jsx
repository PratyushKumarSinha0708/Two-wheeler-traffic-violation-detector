import React from 'react'
import Button from '@mui/material/Button'

function Result({ result, btnClicked }) {

  if (!result) {
    return (
      <>
        <h2>No file processed yet.</h2>
        {btnClicked && (<h3>Processing...</h3>)}
      </>
    );
  }

  const imageUrl = `data:image/jpeg;base64,${result.image}`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "violation.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="result-container">
        <div className="result-image">
          <img src={imageUrl} alt="Detected Violations" />
        </div>
        <div className="result-violations">
          <div>
            <h3>Detected Violations:</h3>
          </div>
          <div className="violations-list">

            {result.violation_types.helmet > 0 && (
              <p>Helmet Violation: {result.violation_types.helmet}</p>
            )}

            {result.violation_types.triple > 0 && (
              <p>Triple Riding: {result.violation_types.triple}</p>
            )}

          </div>
        </div>
      </div>
      <div className="download-result-image">
        <Button variant="contained" size='small' onClick={handleDownload}>Download</Button>
      </div>
    </>
  )
}

export default Result
