// // src/hooks/useMessages.jsx
// import { useState, useEffect } from "react";
// import { getMessagesDM, sendMessageDM } from "../services/messageService";
// import { getMessagesByChannel, sendMessageToChannel } from "../services/channelService";

// export default function useMessages(workspace_id, channel) {
//   const [messages, setMessages] = useState([]);

//   // 🚀 Función para traer mensajes
//   const fetchMessages = async () => {
//     if (!workspace_id || !channel) return;

//     try {
//       let res;
//       if (channel.isDirect) {
//         res = await getMessagesDM(workspace_id, channel.member.user_id);
//       } else {
//         res = await getMessagesByChannel(workspace_id, channel._id);
//       }

//       setMessages(res.data?.messages || []);
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//       setMessages([]); // limpia mensajes si falla
//     }
//   };

//   // 🚀 Función para enviar mensaje
//   const sendMessage = async (content) => {
//     if (!workspace_id || !channel || !content) return;

//     try {
//       if (channel.isDirect) {
//         await sendMessageDM(workspace_id, channel.member.user_id, content);
//       } else {
//         await sendMessageToChannel(workspace_id, channel._id, content);
//       }

//       await fetchMessages(); // refresca los mensajes después de enviar
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   // 🔄 Efecto: cada vez que cambia workspace o channel
//   useEffect(() => {
//     fetchMessages();
//   }, [workspace_id, channel]);

//   return { messages, sendMessage };
// }
