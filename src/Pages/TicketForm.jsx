import { useState } from "react";
import { Button, Grid } from "@mui/material";
import CreateTicket from "./CreateTicket";
import PageWrapper from "../Components/PageWrapper";
import TicketListUser from "./TicketListUser";

function TicketForm() {
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setShowCreateTicket(true);
  };

  return <>{showCreateTicket ? <CreateTicket setShowCreateTicket={setShowCreateTicket} /> : <TicketListUser handleClick={handleClick} />}</>;
}

export default TicketForm;
