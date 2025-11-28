import React, { useEffect } from 'react'
import { Link } from 'react-router'
import useChannels from '../../hooks/useChannels'

const ChannelList = ({ workspace_id }) => {
  const { channels } = useChannels()

  // Log controlado
  useEffect(() => {
    console.log("Channels actualizados:", channels)
  }, [channels])

  return (
    <div style={{ display: 'flex', flexDirection: "column" }}>
      {channels.map((elemento) => (
        <Link key={elemento.channel_id} to={`/workspace/${workspace_id}/${elemento._id}`}>
          {elemento.name}
        </Link>
      ))}
    </div>
  )
}

export default ChannelList
