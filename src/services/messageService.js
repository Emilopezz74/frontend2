// src/services/messageService.js
import axios from "axios";
import ENVIRONMENT from "../config/envionment";
import LOCALSTORAGE_KEYS from "../constants/localstorage";

// Obtener todos los mensajes de un DM
export const getMessagesDM = async (workspace_id, user_id) => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN);
  if (!token) throw new Error("No hay token en localStorage");

  const res = await axios.get(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/dm/${user_id}/messages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Enviar mensaje en DM
export const sendMessageDM = async (workspace_id, user_id, content) => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN);
  if (!token) throw new Error("No hay token en localStorage");

  const res = await axios.post(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/dm/${user_id}/messages`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
