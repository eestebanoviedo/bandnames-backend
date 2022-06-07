import React, { useState, useEffect, useContext } from "react"
import { SocketContext } from "../../context/SocketContext"

const BandList = () => {
  const [bands, setBands] = useState([])
  console.log(bands)
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.on("band-list", (bands) => {
      setBands(bands)
    })

    return () => socket.off("band-list")
  }, [socket])

  const cambioNombre = (e, id) => {
    const newName = e.target.value
    setBands(
      bands.map((band) => (band.id === id ? { ...band, name: newName } : band))
    )
  }

  const onperdiofoco = (id, nombre) => {
    socket.emit("cambiar-nombre-banda", id, nombre)
  }

  const votar = (id) => {
    socket.emit("votar-banda", id)
  }

  const borrar = (id) => {
    socket.emit("borrar-banda", id)
  }

  const crearRow = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(e) => cambioNombre(e, band.id)}
            onBlur={() => onperdiofoco(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => borrar(band.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <div>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRow()}</tbody>
      </table>
    </div>
  )
}

export default BandList
