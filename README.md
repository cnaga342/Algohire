# AlgoHire Webhook Event Relay System

A full-stack system for handling webhook subscriptions, event relay, and delivery for the AlgoHire recruitment platform. This project allows external clients to subscribe to internal events (like job creation, candidate updates, assessments), and receive real-time notifications via webhooks.

---

## Features

- **Webhook Management**
  - Register webhooks for specific event types.
  - List, update, and delete webhook subscriptions.
  - Activate/deactivate subscriptions.

- **Event Trigger**
  - Trigger events manually from a dashboard.
  - Delivery to subscribed webhooks with retry logic.
  - Delivery logs with status (`queued`, `success`, `failed`).

- **Security**
  - HMAC signature for each payload to ensure authenticity.
  - Validation for event types and client subscriptions.

- **Dashboard**
  - Web UI to manage webhooks and events.
  - Separate pages for Webhooks and Events.
  - Inline editing and deletion of webhooks.

---

## Architecture
Internal Modules (Jobs, Candidates, Interviews, Assessments)
|
v
Event API
|
v
MongoDB (Events, Subscriptions, Clients, Deliveries)
|
v
Webhook Delivery Service
|
v
External Client Systems

- **Backend:** Node.js, Express, MongoDB, Axios, Crypto  
- **Frontend:** React, React Router, Axios, TailwindCSS (or inline CSS)  
- **Delivery:** Fire-and-forget asynchronous delivery to webhooks  
- **Security:** HMAC signature verification using client secret  

---

## Libraries Used

- `express` – Web server  
- `mongoose` – MongoDB object modeling  
- `axios` – HTTP requests to external webhooks  
- `crypto` – HMAC signature generation  
- `react` – Frontend UI  
- `react-router-dom` – Page routing  
-  inline CSS also supported)  


## Setup

### Backend

1. Install dependencies:
```bash
cd backend
npm install
2. Configure .env:

- MONGO_URI=<your_mongodb_uri>
- PORT=5000


# Run server:

- npm run dev

# Frontend

- Install dependencies:

- cd frontend/webhook-dashboard
- npm install


- Run frontend:

- npm start
```




### Screenshot
 # webhook form 
<img width="1193" height="470" alt="image" src="https://github.com/user-attachments/assets/cc5cc1c6-068d-4af7-bd69-dc6b3ed35ce6" />
# Webhook list
 <img width="1187" height="736" alt="image" src="https://github.com/user-attachments/assets/92c54a99-93cd-495b-9f06-c75b66e88f83" /><br>
# Event Form and Event List
<img width="1177" height="883" alt="image" src="https://github.com/user-attachments/assets/61add640-d51a-491e-9b8d-db7709d1b427" /><br>
# edit of webhook list
<img width="707" height="391" alt="image" src="https://github.com/user-attachments/assets/ccd36f7c-7183-4773-b7f0-2b7d09064cec" /><br>
# delete webhook <br>
<img width="517" height="715" alt="image" src="https://github.com/user-attachments/assets/0b13d929-80ac-4f48-a4fe-ce86416be34a" />


