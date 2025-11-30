import { useState, useEffect } from "react";
import { getMessagesDM, sendMessageDM } from "../services/messageService";

export default function useMessages(workspace_id, member, current_member_id) {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    if (!workspace_id || !member) return;

    try {
      const res = await getMessagesDM(workspace_id, member.user_id);
      const raw = res.messages || [];

      const mapped = raw.map((msg) => ({
        ...msg,
        sender_me: msg.sender_member_id === current_member_id,  // 👈 AHORA FUNCIONA
        sender_name: msg.sender_member_id === current_member_id ? "Yo" : member.name
      }));

      setMessages(mapped);
    } catch (err) {
      console.error("Error al obtener mensajes DM:", err);
    }
  };
const send = async (content) => {
  if (!workspace_id || !member) return;

  // Comparar correctamente con tu propio user_id

  try {
    await sendMessageDM(workspace_id, member.user_id, content);
    await fetchMessages();
  } catch (err) {
    console.error("Error al enviar mensaje DM:", err);
  }
};


  useEffect(() => {
    fetchMessages();
  }, [workspace_id, member]);

  return { messages, sendMessage: send };
}
