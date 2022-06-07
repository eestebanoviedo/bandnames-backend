import React, { useState, useEffect, useContext } from "react"

import BandList from "../Components/BandList"
import BandAdd from "../Components/BandAdd"
import { BandChart } from "../Components/BandChart"

import { SocketContext } from "../context/SocketContext"

function HomePage() {
  const { online } = useContext(SocketContext)

  return (
    <div className="container">
      <div className="alert">
        <p>Service status:</p>
        {online ? (
          <span className="text-success">Online</span>
        ) : (
          <span className="text-danger">Offline</span>
        )}
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  )
}

export default HomePage
