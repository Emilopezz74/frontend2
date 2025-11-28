// src/services/channelService.js
import ENVIRONMENT from "../config/envionment";
import { getAuthorizationToken } from "../constants/http";

// 🔹 Lista de canales de un workspace
export async function getChannelListByWorkspaceId(workspace_id) {
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthorizationToken()}`,
      },
    }
  );
  const response_data = await response_http.json();
  if (!response_data.ok) {
    throw new Error(response_data.message || "Error al obtener los canales");
  }
  return response_data;
}

// 🔹 Crear un nuevo canal en un workspace
export async function createNewChannel(workspace_id, name) {
  const body = { name };
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthorizationToken()}`,
      },
      body: JSON.stringify(body),
    }
  );
  const response_data = await response_http.json();
  if (!response_data.ok) {
    throw new Error(response_data.message);
  }
  return response_data;
}

// 🔹 Obtener mensajes de un canal
export async function getMessagesByChannel(workspace_id, channel_id) {
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthorizationToken()}`,
      },
    }
  );
  const response_data = await response_http.json();
  if (!response_data.ok) {
    throw new Error(response_data.message || "Error al obtener los mensajes del canal");
  }
  return response_data;
}

// 🔹 Enviar mensaje a un canal
export async function sendMessageToChannel(workspace_id, channel_id, content) {
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthorizationToken()}`,
      },
      body: JSON.stringify({ content }),
    }
  );
  const response_data = await response_http.json();
  if (!response_data.ok) {
    throw new Error(response_data.message || "Error al enviar el mensaje al canal");
  }
  return response_data;
}
