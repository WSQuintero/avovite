import React, { useState } from "react";
import { Button, Modal, Typography } from "@mui/material";

const ContractButton = ({ renderedCellValue }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const parsedCellValue = JSON.parse(renderedCellValue);

  return (
    <>
      <Button variant="contained" onClick={handleModalOpen}>
        Open Modal
      </Button>
      <Modal open={openModal} onClose={handleModalClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Aquí puedes renderizar los datos del parsedCellValue dentro del modal */}
          <Typography variant="h5">Parsed Cell Value</Typography>
          <Typography>{JSON.stringify(parsedCellValue)}</Typography>
        </div>
      </Modal>
    </>
  );
};

export default ContractButton;
