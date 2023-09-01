import React from "react";
import PageWrapper from "./PageWrapper";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";

function ContractValidation() {
  return (
    <PageWrapper isInvalidSession>
      <Dialog open disableEscapeKeyDown>
        <DialogTitle color="error" display="flex" alignItems="center" gap={1}>
          <WarningIcon /> Tienes contratos pendientes
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Para poder continuar debes de efectuar pagos todos tus contratos.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained">Pagar</Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}

export default ContractValidation;
