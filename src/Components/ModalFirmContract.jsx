import { Box, Modal, Typography } from "@mui/material";

function ModalFirmContract({ open, handleClose, informationContractFilter, contractsWithMortgageSigned }) {
  return (
    <Modal open={false} onClose={handleClose}>
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
        {informationContractFilter && informationContractFilter.length > 0 && (
          <Typography sx={{ textAlign: "center", color: "#67aa36", marginTop: 1 }}>
            {`Los contratos ${informationContractFilter
              .map((contract) => contract.id)
              .join(" y ")} ya fueron enviados a tu correo para su respectiva firma`}
          </Typography>
        )}
        {contractsWithMortgageSigned && contractsWithMortgageSigned.length > 0 && (
          <>
            <Typography sx={{ color: "#214820", fontWeight: "bold", textAlign: "center", fontSize: 20, marginTop: 3 }}>
              Ten en cuenta
            </Typography>

            <Typography sx={{ textAlign: "center", color: "#67aa36", marginTop: 1 }}>
              {`Los contratos ${contractsWithMortgageSigned
                .map((contract) => contract.id)
                .join(
                  " y "
                )}  se están verificando con el área encargada para colocar el predio de la hipoteca. En un lapso máximo de 24 horas días hábiles estará en tu correo.`}
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default ModalFirmContract;
