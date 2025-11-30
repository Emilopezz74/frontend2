"use client"

import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import useForm from "../../hooks/useForm"
import { inviteUser, getWorkspaceMembers } from "../../services/workspaceService"
import "./InviteUser.css"

function InviteUserForm({ workspace_id, onUserInvited }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { sendRequest, response, error, loading } = useFetch()
  const initial_state = { email: "" }

  const onSubmit = (form_data) => {
    sendRequest(async () => {
      return await inviteUser(form_data.email, workspace_id)
    })
  }

  const { form_state, handleInputChange, handleSubmit } = useForm({
    initial_form_state: initial_state,
    onSubmit
  })

  const handleOpenInviteForm = () => setIsOpen(true)
  const handleCloseInviteForm = () => setIsOpen(false)

  // Cuando llega la respuesta exitosa
  if (response && !error && !showSuccess) {
    setShowSuccess(true)
    setTimeout(() => {
      if (onUserInvited) onUserInvited()
      handleCloseInviteForm()
      setShowSuccess(false)
    }, 1200)
  }

  // Botón siempre visible
  if (!isOpen) {
    return (
      <button className="invite-btn-open" onClick={handleOpenInviteForm}>
        + Invitar usuario
      </button>
    )
  }

  return (
    <form className="invite-form" onSubmit={handleSubmit}>
      <input
        placeholder="Ingresa el email del usuario"
        type="email"
        name="email"
        value={form_state.email}
        onChange={handleInputChange}
      />

      {error && <span className="invite-error">{error.message}</span>}
      {showSuccess && response && (
        <span className="invite-success">{response.message}</span>
      )}

      <div className="invite-buttons">
        <button type="submit" className="invite-btn-submit" disabled={loading}>
          Invitar
        </button>
        <button
          type="button"
          className="invite-btn-cancel"
          onClick={handleCloseInviteForm}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default InviteUserForm




















// "use client"

// import { useState } from "react"
// import useFetch from "../../hooks/useFetch"
// import useForm from "../../hooks/useForm"
// import { inviteUser } from "../../services/workspaceService"

// function InviteUserForm({ workspace_id, onUserInvited }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)

//   function handleOpenInviteForm() {
//     setIsOpen(true)
//   }
//   function handleCloseInviteForm() {
//     setIsOpen(false)
//   }

//   const { sendRequest, response, error, loading } = useFetch()

//   const initial_state = { email: "" }

//   const onSubmit = (form_data) => {
//     sendRequest(async () => {
//       return await inviteUser(form_data.email, workspace_id)
//     })
//   }

//   const { form_state, handleInputChange, handleSubmit } = useForm({
//     initial_form_state: initial_state,
//     onSubmit
//   })

//   // Cuando llega la respuesta exitosa
//   if (response && !error && !showSuccess) {
//     setShowSuccess(true)

//     setTimeout(() => {
//       if (onUserInvited) onUserInvited()
//       handleCloseInviteForm()
//       setShowSuccess(false)
//     }, 1200)
    
//   }

//   if (!isOpen) {
//     return <button onClick={handleOpenInviteForm}> + Invitar usuario</button>
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="ingresa el email del usuario"
//         type="email"
//         name="email"
//         onChange={handleInputChange}
//       />

//       {error && <span style={{ color: "red" }}>{error.message}</span>}
//       {showSuccess && response && (
//         <span style={{ color: "green" }}>{response.message}</span>
//       )}

//       <button type="submit" disabled={loading}>
//         Invitar
//       </button>

//       <button type="button" onClick={handleCloseInviteForm}>
//         Cancelar
//       </button>
//     </form>
//   )
// }

// export default InviteUserForm

