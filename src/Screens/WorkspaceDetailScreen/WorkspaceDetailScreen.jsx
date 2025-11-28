import ChatBox from "../../Components/ChatBox/ChatBox";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { getWorkspaceById, getWorkspaceMembers } from "../../services/workspaceService";
import InviteUserForm from "../../Components/InviteUserForm/InviteUserForm";
import ChannelList from "../../components/ChannelList/ChannelList";

const WorkspaceDetailScreen = () => {
  const { workspace_id } = useParams();
  const [workspaceDetail, setWorkspaceDetail] = useState({ members: [] });
  const [members, setMembers] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null); // <-- canal o miembro seleccionado
  const { sendRequest, response, error, loading } = useFetch();

  // Cargar workspace y miembros
  const reloadWorkspaceData = () => {
    if (!workspace_id) return;

    sendRequest(async () => {
      const result = await getWorkspaceById(workspace_id);
      setWorkspaceDetail(result.data.workspace);

      const membersResult = await getWorkspaceMembers(workspace_id);
      setMembers(membersResult.data.members);

      return result;
    });
  };

  useEffect(() => {
    reloadWorkspaceData();
  }, [workspace_id]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Lado izquierdo: lista de miembros y canales */}

      {/* Lado derecho: chat */}
      <div className="ws-main" style={{ flex: 1 }}>
        {selectedChannel ? (
          <ChatBox channel_id={selectedChannel._id} />
        ) : (
          <div style={{ padding: "20px" }}>
            Selecciona un canal o miembro para ver los chats
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceDetailScreen;
