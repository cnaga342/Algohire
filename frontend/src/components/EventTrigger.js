import React, { useState } from "react";
import api from "../api/api";

const EventTrigger = ({ onSuccess }) => {
  const [type, setType] = useState("");
  const [payload, setPayload] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", { type, payload: JSON.parse(payload) });
      setType("");
      setPayload("");
      alert("Event triggered!");
      onSuccess?.(); // Call parent to refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to trigger event");
    }
  };

  const formStyle = {
    padding: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textAlign: "left"
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #d1d5db", // gray-300
    padding: "8px",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#22c55e", // green-500
    color: "#fff",
    padding: "8px",
    borderRadius: "6px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer"
  };

  const buttonHoverStyle = {
    backgroundColor: "#16a34a" // green-600
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={formStyle}
    >
      <input
        type="text"
        placeholder="Event Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={inputStyle}
        required
      />
      <textarea
        placeholder='Payload JSON e.g. {"candidate":"John"}'
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        style={{ ...inputStyle, height: "100px" }}
        rows="4"
        required
      ></textarea>
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Trigger Event
      </button>
    </form>
  );
};

export default EventTrigger;
