import React, { useEffect, useState } from "react";
import api from "../api/api";

const EventList = ({ refresh }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data.reverse()); // latest first
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, [refresh]);

  const containerStyle = {
    marginTop: "24px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "left"
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "8px"
  };

  const noEventsStyle = {
    color: "#6b7280" // gray-500
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0
  };

  const itemStyle = {
    border: "1px solid #e5e7eb",
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: "#f9fafb",
    marginBottom: "8px"
  };

  const dateStyle = {
    color: "#9ca3af",
    fontSize: "12px",
    marginTop: "4px"
  };

  const payloadStyle = {
    marginTop: "4px"
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Triggered Events</h2>
      {events.length === 0 ? (
        <p style={noEventsStyle}>No events triggered yet.</p>
      ) : (
        <ul style={listStyle}>
          {events.map((e) => (
            <li key={e._id} style={itemStyle}>
              <p><strong>Type:</strong> {e.type}</p>
              <div style={payloadStyle}>
                <strong>Details:</strong>
                <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
                  {Object.entries(e.payload).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value.toString()}
                    </li>
                  ))}
                </ul>
              </div>
              <p style={dateStyle}>Created: {new Date(e.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
