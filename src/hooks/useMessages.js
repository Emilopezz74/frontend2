import { useState, useEffect, useRef } from "react";
import { getMessagesDM, sendMessageDM } from "../services/messageService";

export default function useMessages(workspace_id, member, current_member_id) {
  const [messages, setMessages] = useState([]);

  const lastMessageId = useRef(null); // 👉 para evitar duplicados
  const intervalRef = useRef(null);

  const fetchMessages = async () => {
    if (!workspace_id || !member) return;

    try {
      const res = await getMessagesDM(workspace_id, member.user_id);
      const raw = res.messages || [];

      // 👉 Mapeo
      const mapped = raw.map((msg) => ({
        ...msg,
        sender_me: msg.sender_member_id === current_member_id,
        sender_name:
          msg.sender_member_id === current_member_id ? "Yo" : member.name,
      }));

      // 🛑 Evitar re-render innecesario si no hay mensajes nuevos
      if (mapped.length === messages.length) return;

      setMessages(mapped);

      // guardar último mensaje
      if (mapped.length > 0) {
        lastMessageId.current = mapped[mapped.length - 1].id;
      }

    } catch (err) {
      console.error("Error al obtener mensajes DM:", err);
    }
  };

  const send = async (content) => {
    if (!workspace_id || !member) return;

    try {
      await sendMessageDM(workspace_id, member.user_id, content);
      await fetchMessages(); // 🔥 se refresca instantáneo
    } catch (err) {
      console.error("Error al enviar mensaje DM:", err);
    }
  };

  // 🔥 POLLING cada 1.2s (sin duplicados)
  useEffect(() => {
    if (!workspace_id || !member) return;

    fetchMessages(); // carga inicial

    intervalRef.current = setInterval(() => {
      fetchMessages();
    }, 1200);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [workspace_id, member]);

  return { messages, sendMessage: send };
}








// import { useState, useEffect } from "react";
// import { getMessagesDM, sendMessageDM } from "../services/messageService";

// export default function useMessages(workspace_id, member, current_member_id) {
//   const [messages, setMessages] = useState([]);

//   const fetchMessages = async () => {
//     if (!workspace_id || !member) return;

//     try {
//       const res = await getMessagesDM(workspace_id, member.user_id);
//       const raw = res.messages || [];

//       const mapped = raw.map((msg) => ({
//         ...msg,
//         sender_me: msg.sender_member_id === current_member_id,  // 👈 AHORA FUNCIONA
//         sender_name: msg.sender_member_id === current_member_id ? "Yo" : member.name
//       }));

//       setMessages(mapped);
//     } catch (err) {
//       console.error("Error al obtener mensajes DM:", err);
//     }
//   };
// const send = async (content) => {
//   if (!workspace_id || !member) return;

//   // Comparar correctamente con tu propio user_id

//   try {
//     await sendMessageDM(workspace_id, member.user_id, content);
//     await fetchMessages();
//   } catch (err) {
//     console.error("Error al enviar mensaje DM:", err);
//   }
// };


//   useEffect(() => {
//     fetchMessages();
//   }, [workspace_id, member]);

//   return { messages, sendMessage: send };
// }
