import React, { useState } from "react";
import EventTrigger from "../components/EventTrigger";
import EventList from "../components/EventList";

const EventPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <EventTrigger onSuccess={() => setRefresh(!refresh)} />
      <EventList refresh={refresh} />
    </div>
  );
};

export default EventPage;
