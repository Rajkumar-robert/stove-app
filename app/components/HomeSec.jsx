"use client"

import React from 'react'
import Filter from './Filter'
import Recipegrid from './Recipegrid'
import "../globals.css"

const HomeSec = () => {
  return (
    <div>
      <Filter/>
      <Recipegrid/>
    </div>
  )
}

export default HomeSec
