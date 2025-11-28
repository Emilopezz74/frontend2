// import React, { useState } from "react";
// import useMessages from "../../hooks/useMessages";

// const ChatBox = ({ workspace_id, channel }) => {
//   const { messages, sendMessage } = useMessages(workspace_id, channel);
//   const [newMessage, setNewMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;
//     await sendMessage(newMessage.trim());
//     setNewMessage("");
//   };

//   // 🔹 Para mostrar mensaje de "seleccioná un miembro"
// if (!workspace_id || (!channel?._id && !channel?.member?.user_id)) {
//   return <div style={{ padding: 20 }}>Seleccioná un miembro o canal para chatear…</div>;
// }

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
//       {/* Lista de mensajes */}
//       <div style={{ flex: 1, overflowY: "auto", padding: "10px", border: "1px solid #ccc" }}>
//         {messages.length === 0 && <div>No hay mensajes aún</div>}
//         {messages.map((msg, idx) => (
//           <div key={idx} style={{ marginBottom: "8px" }}>
//             <strong>{msg.sender_name || "Usuario"}: </strong>
//             <span>{msg.content}</span>
//             <small style={{ color: "#888", marginLeft: "5px" }}>
//               ({new Date(msg.created_at).toLocaleTimeString()})
//             </small>
//           </div>
//         ))}
//       </div>

//       {/* Formulario */}
//       <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "5px" }}>
//         <input
//           style={{ flex: 1, padding: "5px" }}
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Escribí un mensaje..."
//         />
//         <button type="submit" style={{ marginLeft: "5px" }}>Enviar</button>
//       </form>
//     </div>
//   );
// };

// export default ChatBox;
