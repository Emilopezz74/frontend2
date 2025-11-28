"use client"
import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { getWorkspaceById, getWorkspaceList, getWorkspaceMembers } from "../../services/workspaceService"
import InviteUserForm from "../../Components/InviteUserForm/InviteUserForm.jsx"
import "./HomeScreen.css"
import { useNavigate } from "react-router"
import LOCALSTORAGE_KEYS from "../../constants/localstorage"
import CreateWorkspaceScreen from "../CreateWorkspaceScreen/CreateWorkspaceScreen.jsx"
import Modal from "./modal.jsx"
import ChatBox from "../../Components/ChatBox/ChatBox.jsx"

const HomeScreen = () => {
  const { loading, response, error, sendRequest } = useFetch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [workspaceDetail, setWorkspaceDetail] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const name = localStorage.getItem("user_name")
    if (name) setUserName(name)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    if (!token || token === "null" || token === "undefined") {
      return
    }
    sendRequest(getWorkspaceList)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem("user_name")
    navigate("/login", { replace: true })
  }

  const [members, setMembers] = useState([])

  const handleWorkspaceClick = async (workspace) => {
    setSelectedWorkspace(workspace)
    setSelectedChannel(null)
    setSelectedMember(null) // Reset selected member when changing workspace
    try {
      const detailRes = await getWorkspaceById(workspace.workspace_id)
      setWorkspaceDetail(detailRes.data.workspace)
      const membersRes = await getWorkspaceMembers(workspace.workspace_id)
      setMembers(membersRes.data.members)
    } catch (err) {
      console.error(err)
      alert("Error al cargar workspace. Revisa tu token o login.")
    }
  }

  const handleBackToList = () => {
    setSelectedWorkspace(null)
    setWorkspaceDetail(null)
    setSelectedChannel(null)
    setSelectedMember(null)
  }

  const handleBackFromChat = () => {
    setSelectedMember(null)
  }

const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="ws-container">
      {/* Sidebar - Workspace List */}
      <div className={`ws-sidebar ${selectedMember ? "ws-sidebar-hidden-mobile" : ""}`}>
        {!selectedWorkspace ? (
          <>
            {/* Sidebar listado de workspaces */}
            <div className="ws-header">
              <div className="ws-user-info">
                <div className="ws-avatar">{userName ? userName.charAt(0).toUpperCase() : "U"}</div>
                <div className="ws-user-details">
                  <h2 className="ws-username">{userName || "Usuario"}</h2>
                  <span className="ws-status">En línea</span>
                </div>
              </div>
              <button onClick={handleLogout} className="ws-logout-btn" title="Cerrar sesión">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
        <div className="ws-search">
  <svg className="ws-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"></circle>
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
  </svg>
  <input
    type="text"
    placeholder="Buscar o crear workspace"
    className="ws-search-input"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

            <div className="ws-chat-list">
{!loading &&
 response &&
 response.data.workspaces
   .filter((workspace) =>
     workspace.workspace_name.toLowerCase().includes(searchTerm.toLowerCase())
   )
   .map((elemento) => (
     <div
       key={elemento.workspace_id}
       className="ws-chat-item"
       onClick={() => handleWorkspaceClick(elemento)}
     >
       <div className="ws-chat-avatar">{elemento.workspace_name.charAt(0).toUpperCase()}</div>
       <div className="ws-chat-content">
         <div className="ws-chat-header">
           <h3 className="ws-chat-name">{elemento.workspace_name}</h3>
         </div>
         <div className="ws-chat-preview">
           <span className="ws-chat-message">Toca para abrir workspace</span>
         </div>
       </div>
     </div>
))}
              <div className="ws-chat-item ws-new-chat" onClick={() => setIsModalOpen(true)}>
                <div className="ws-new-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </div>
                <div className="ws-chat-content">
                  <h3 className="ws-chat-name">Crear nuevo workspace</h3>
                  <span className="ws-chat-message">Comienza un nuevo espacio de trabajo</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Detalle del workspace */}
            <div className="ws-detail-header">
              <button onClick={handleBackToList} className="ws-back-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="ws-detail-info">
                <div className="ws-detail-avatar">{selectedWorkspace.workspace_name.charAt(0).toUpperCase()}</div>
                <div>
                  <h2 className="ws-detail-name">{workspaceDetail?.name || selectedWorkspace.workspace_name}</h2>
                  <span className="ws-detail-status">Workspace activo</span>
                </div>
              </div>
            </div>
            <div className="ws-detail-content">
              {/* Lista de miembros */}
              <div className="ws-members-list">
                <h3>Miembros</h3>
                <ul>
                  {workspaceDetail?.members?.length === 0 && <li className="ws-no-members">No hay miembros aún</li>}
                  {workspaceDetail?.members?.map((member) => (
                    <li
                      key={member.user_id}
                      className={`ws-member-item ${selectedMember?.user_id === member.user_id ? "ws-member-selected" : ""}`}
                      onClick={() => {
                        setSelectedMember(member)
                      }}
                    >
                      <div className="ws-member-avatar">{member.name?.charAt(0).toUpperCase() || "?"}</div>
                      <div className="ws-member-info">
                        <div className="ws-member-name">{member.name}</div>
                        <div className="ws-member-role">{member.member_role}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Formulario de invitación */}
              <InviteUserForm
                workspace_id={selectedWorkspace.workspace_id}
                onUserInvited={async () => {
                  try {
                    const membersRes = await getWorkspaceMembers(selectedWorkspace.workspace_id)
                    setMembers(membersRes)
                  } catch (err) {
                    console.error(err)
                  }
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Main - Chat encriptado */}
      <div className={`ws-main ${selectedMember ? "ws-main-visible-mobile" : ""}`}>
        {selectedWorkspace && selectedMember ? (
          <div className="ws-chat-wrapper">
            {/* Removed window.innerWidth check - let CSS media query handle visibility */}
            <div className="ws-mobile-chat-header">
              <button onClick={handleBackFromChat} className="ws-mobile-back-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="ws-mobile-chat-member-info">
                <div className="ws-mobile-member-avatar">{selectedMember.name?.charAt(0).toUpperCase() || "?"}</div>
                <div>
                  <h2 className="ws-mobile-member-name">{selectedMember.name}</h2>
                  <span className="ws-mobile-member-status">{selectedMember.member_role}</span>
                </div>
              </div>
            </div>
            <ChatBox
              workspace_id={selectedWorkspace.workspace_id}
              member={selectedMember}
              current_user_id={localStorage.getItem("user_id")}
            />
          </div>
        ) : (
          <div className="ws-empty-state">
            <div className="ws-lock-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"></rect>
                <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                <circle cx="12" cy="16" r="1" fill="currentColor"></circle>
              </svg>
            </div>
            <h2 className="ws-empty-title">Chats encriptados de extremo a extremo</h2>
            <p className="ws-empty-text">
              Selecciona un workspace de la lista para comenzar a colaborar de forma segura. Tus mensajes están
              protegidos con encriptación de extremo a extremo.
            </p>
            <div className="ws-floating-bubbles">
              <div className="ws-bubble"></div>
              <div className="ws-bubble"></div>
              <div className="ws-bubble"></div>
            </div>
          </div>
        )}
      </div>

      {/* Modal crear workspace */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreateWorkspaceScreen
            onClose={() => setIsModalOpen(false)}
            onWorkspaceCreated={() => sendRequest(getWorkspaceList)}
          />
        </Modal>
      )}
    </div>
  )
}

export default HomeScreen
