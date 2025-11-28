import ENVIRONMENT from "../config/envionment";
import { getAuthorizationToken } from "../constants/http";

// Función helper para manejar responses
async function handleResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Error al parsear la respuesta del servidor");
  }

  // Lanzar error si HTTP falla o backend responde con ok: false
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
}

// GET workspaces
async function getWorkspaceList() {
  const token = getAuthorizationToken();
  if (!token) throw new Error("No hay token de autorización");

  const response = await fetch(`${ENVIRONMENT.URL_API}/api/workspace`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
}

// GET workspace by ID
async function getWorkspaceById(workspace_id) {
  const token = getAuthorizationToken();
  if (!token) throw new Error("No hay token de autorización");

  const response = await fetch(`${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
}

// CREATE workspace
async function createWorkspace(name, url_img = "") {
  const token = getAuthorizationToken();
  if (!token) throw new Error("No hay token de autorización");

  const body = { name, url_img };
  const response = await fetch(`${ENVIRONMENT.URL_API}/api/workspace`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

// INVITE user
async function inviteUser(email, workspace_id) {
  const token = getAuthorizationToken();
  if (!token) throw new Error("No hay token de autorización");

  const response = await fetch(`${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ invited_email: email }),
  });

  return handleResponse(response);
}

// GET workspace members
async function getWorkspaceMembers(workspace_id) {
  const token = getAuthorizationToken();
  if (!token) throw new Error("No hay token de autorización");

  const response = await fetch(`${ENVIRONMENT.URL_API}/api/member/workspace/${workspace_id}/member`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Para miembros usamos la misma validación
  return handleResponse(response);
}

export { getWorkspaceList, createWorkspace, getWorkspaceById, inviteUser, getWorkspaceMembers };
