import { Box, Modal, Typography } from "@mui/material";

function ModalFirmContract({ open, handleClose, informationContractFilter }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <Typography sx={{ color: "#214820", fontWeight: "bold", textAlign: "center", fontSize: 20 }}>Ten en cuenta</Typography>
        <Typography sx={{ textAlign: "center", color: "#67aa36", marginTop: 5 }}>
          {informationContractFilter &&
            informationContractFilter.length > 0 &&
            `Los contratos ${informationContractFilter
              .map((contract) => contract.id)
              .join(", ")} ya fueron enviados a tu correo para su respectiva firma`}
        </Typography>
      </Box>
    </Modal>
  );
}

export default ModalFirmContract;
