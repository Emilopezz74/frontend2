import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import useFetch from '../../hooks/useFetch'
import { createWorkspace } from '../../services/workspaceService'
import './CreateWorkspaceScreen.css'

const CreateWorkspaceScreen = ({ onClose, onWorkspaceCreated }) => {
  const { response, error, sendRequest } = useFetch()
  const initial_state = { workspace_name: '' }

  const onSubmit = (form_data) => {
    sendRequest(() => createWorkspace(form_data.workspace_name, ''))
  }

  useEffect(() => {
    if (response && response.ok) {
      if (onWorkspaceCreated) onWorkspaceCreated()
      if (onClose) onClose()
    }
  }, [response])

  const { form_state, handleInputChange, handleSubmit } = useForm({
    initial_form_state: initial_state,
    onSubmit
  })

  return (
    <div className='create-css'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="white_name" htmlFor="workspace_name">Nombre del espacio de trabajo</label>
          <input
            type="text"
            name="workspace_name"
            id="workspace_name"
            value={form_state.workspace_name}
            onChange={handleInputChange}
          />
        </div>
        {error && <span style={{ color: 'red' }}>{error.message}</span>}
        <button className='crear-css'>Crear espacio de trabajo</button>
      </form>
    </div>
  )
}

export default CreateWorkspaceScreen
