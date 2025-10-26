import React, { useEffect, useState } from "react";
import api from "../api/api";

const WebhookList = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [editing, setEditing] = useState(null); // current webhook being edited
  const [editUrl, setEditUrl] = useState("");
  const [editEvents, setEditEvents] = useState("");

  const fetchWebhooks = async () => {
    try {
      const res = await api.get("/webhooks");
      setWebhooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchWebhooks(); }, []);

  const deleteWebhook = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/webhooks/${id}`);
      fetchWebhooks();
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (w) => {
    setEditing(w);
    setEditUrl(w.url);
    setEditEvents(w.events.join(", "));
  };

  const saveEdit = async () => {
    try {
      const eventsArray = editEvents.split(",").map(e => e.trim());
      await api.put(`/webhooks/${editing._id}`, { url: editUrl, events: eventsArray });
      setEditing(null);
      fetchWebhooks();
    } catch (err) {
      console.error(err);
      alert("Failed to update webhook");
    }
  };

  // Inline styles
  const containerStyle = { marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" };
  const itemStyle = { padding: "16px", backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" };
  const detailsStyle = { display: "flex", flexDirection: "column", gap: "4px" };
  const btnStyle = { padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", marginLeft: "8px" };
  const deleteBtnStyle = { ...btnStyle, backgroundColor: "#ef4444", color: "#fff" };
  const editBtnStyle = { ...btnStyle, backgroundColor: "#3b82f6", color: "#fff" };
  const modalStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" };
  const modalContentStyle = { backgroundColor: "#fff", padding: "24px", borderRadius: "8px", width: "400px", display: "flex", flexDirection: "column", gap: "12px" };
  const inputStyle = { padding: "8px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "14px", width: "100%" };

  return (
    <div style={containerStyle}>
      {webhooks.map((w) => (
        <div key={w._id} style={itemStyle}>
          <div style={detailsStyle}>
            <p><strong>Client:</strong> {w.clientId?.name}</p>
            <p><strong>URL:</strong> {w.url}</p>
            <p><strong>Events:</strong> {w.events.join(", ")}</p>
            <p><strong>Active:</strong> {w.active ? "Yes" : "No"}</p>
          </div>
          <div>
            <button style={editBtnStyle} onClick={() => openEdit(w)}>Edit</button>
            <button style={deleteBtnStyle} onClick={() => deleteWebhook(w._id)}>Delete</button>
          </div>
        </div>
      ))}

      {editing && (
        <div style={modalStyle} onClick={() => setEditing(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <h3>Edit Webhook</h3>
            <input style={inputStyle} type="text" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
            <input style={inputStyle} type="text" value={editEvents} onChange={(e) => setEditEvents(e.target.value)} placeholder="Events (comma separated)" />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button style={{ ...btnStyle, backgroundColor: "#6b7280", color: "#fff" }} onClick={() => setEditing(null)}>Cancel</button>
              <button style={{ ...btnStyle, backgroundColor: "#10b981", color: "#fff" }} onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhookList;
