import React, { useState, useEffect } from "react";
import api from "../api/api";

const WebhookForm = ({ onSuccess }) => {
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find clientId by name (or create new client)
      let client = clients.find(c => c.name === clientName);
      if (!client) {
        const res = await api.post("/clients", {
          name: clientName,
          apiKey: "dummyKey",
          secret: "dummySecret",
        });
        client = res.data;
        setClients([...clients, client]);
      }

      const eventArray = events.split(",").map(e => e.trim());
      await api.post("/webhooks/register", { clientId: client._id, url, events: eventArray });
      
      setUrl("");
      setEvents("");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to register webhook");
    }
  };

  const formStyle = {
    padding: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textAlign: "left"
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #d1d5db",
    padding: "8px",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#3b82f6", // blue-500
    color: "#fff",
    padding: "8px",
    borderRadius: "6px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer"
  };

  const buttonHoverStyle = {
    backgroundColor: "#2563eb" // blue-600
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={formStyle}
    >
      <input
        list="client-list"
        placeholder="Type client name..."
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        style={inputStyle}
        required
      />
      <datalist id="client-list">
        {clients.map(c => (
          <option key={c._id} value={c.name} />
        ))}
      </datalist>

      <input
        type="text"
        placeholder="Webhook URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={inputStyle}
        required
      />

      <input
        type="text"
        placeholder="Events (comma separated)"
        value={events}
        onChange={(e) => setEvents(e.target.value)}
        style={inputStyle}
        required
      />

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Register Webhook
      </button>
    </form>
  );
};

export default WebhookForm;
