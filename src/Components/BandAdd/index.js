import React, { useState, useContext } from "react"
import { SocketContext } from "../../context/SocketContext"

const BandAdd = () => {
  const [nombre, setNombre] = useState("")

  const { socket } = useContext(SocketContext)

  const onSubmit = (e) => {
    e.preventDefault()
    if (nombre.trim().length > 0) {
      socket.emit("crear-banda", nombre)
      setNombre("")
    }
  }

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </form>
    </>
  )
}

export default BandAdd
