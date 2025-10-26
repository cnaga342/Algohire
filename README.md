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

