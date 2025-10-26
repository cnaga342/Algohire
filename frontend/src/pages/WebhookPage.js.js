import React, { useState } from "react";
import WebhookForm from "../components/WebhookForm";
import WebhookList from "../components/WebhookList";

const WebhookPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <WebhookForm onSuccess={() => setRefresh(!refresh)} />
      <WebhookList key={refresh} />
    </div>
  );
};

export default WebhookPage;
