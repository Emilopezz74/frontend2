import { useEffect, useState } from "react"
import { getChannelListByWorkspaceId } from "../services/channelService"

const useChannels = (workspace_id) => {
    const [channels, setChannels] = useState([])

    useEffect(() => {
        if (!workspace_id) return

        getChannelListByWorkspaceId(workspace_id)
            .then(res => setChannels(res.data.channels))
            .catch(err => console.error(err))
    }, [workspace_id])

    return { channels }
}

export default useChannels
