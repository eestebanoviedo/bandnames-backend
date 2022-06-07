import { useMemo, useEffect, useState } from "react"
import io from "socket.io-client"

export const useSocket = (serverPath) => {
  const socket = useMemo(
    () =>
      io.connect("http://localhost:8080", {
        transports: ["websocket"],
      }),
    [serverPath]
  )
  const [online, setOnline] = useState(false)

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false)
    })
  }, [socket])

  return {
    socket,
    online,
  }
}
