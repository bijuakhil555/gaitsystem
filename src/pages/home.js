import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
      <h1>
        Welcome to Gait Analyser

      </h1>
      <Link to="/gait">
      <Button variant="contained" size="Large" style={{marginLeft:'37%'}}>Explore</Button>
      </Link>

        </div>
    )
}

export default Home