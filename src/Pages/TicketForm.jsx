import { useState } from "react";
import CreateTicket from "../Components/CreateTicket";
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
