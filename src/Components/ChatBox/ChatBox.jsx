"use client";

import { useState } from "react";
import useMessages from "../../hooks/useMessages";
import "./Chatbox.css";

const ChatBox = ({ workspace_id, member, current_user_id }) => {
  const { messages, sendMessage } = useMessages(workspace_id, member, current_user_id);
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await sendMessage(newMessage.trim());
    setNewMessage("");
  };

  if (!workspace_id || !member) {
    return <div className="chat-empty">Seleccioná un miembro para chatear…</div>;
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-avatar">{member.name?.charAt(0).toUpperCase()}</div>
        <div className="chat-header-info">
          <h3 className="chat-header-name">{member.name}</h3>
          <span className="chat-header-status">En línea</span>
        </div>
      </div>

      {/* Mensajes */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-no-messages">
            <div className="chat-no-messages-icon">💬</div>
            <p>No hay mensajes aún. ¡Comienza la conversación!</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender_id === msg.sender_id ? "sent" : "received"}`}
          >
            <div className="chat-message-bubble">
              <p className="chat-message-text">{msg.content}</p>
              <span className="chat-message-time">{new Date(msg.created_at).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          placeholder="Escribí un mensaje..."
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="chat-send-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M16.691 6.61l-7.523 10.032a1 1 0 01-1.638-1.08l2.399-7.22H4a1 1 0 010-2h7.929l-2.399-7.22a1 1 0 011.638-1.08l7.523 10.032a1 1 0 010 1.536z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
