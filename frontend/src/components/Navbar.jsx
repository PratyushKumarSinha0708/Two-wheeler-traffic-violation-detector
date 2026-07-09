import React from 'react'
import Button from '@mui/material/Button';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';

function Navbar() {
    return (
        <>
            <div className="navbar-container">
                <div className='title-container'>
                    <div className="navbar-helmet-icon">
                        <SportsMotorsportsIcon />
                    </div>
                    <div className="navbar-title">
                        <h2>Two Wheeler Traffic violation detector</h2>
                    </div>
                </div>

                {/* <div className="navbar-history-button" >
                    <Button variant="contained" size='small'>History</Button>
                </div> */}

            </div>

        </>
    )
}

export default Navbar
