import { 
  Box, 
  Grid, 
  Alert,
  Button, 
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  MenuItem, 
  Checkbox, 
  TextField, 
  FormGroup, 
  Typography, 
  FormControlLabel
} from '@mui/material';
import { MaterialReactTable } from "material-react-table";
import { messagesList  } from "../../utilities/constants";
import { Message } from "@mui/icons-material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { NumericFormat } from "react-number-format";
import { useState } from 'react';

import MarketingStateConfigForm from './MarketingStateConfigForm';

const MarketingStateConfig = ({configState, onClose}) => {
  const [channels, setChannels] = useState([]);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState(false);
  const [openStateConfig, setOpenStateConfig] = useState(false);
  const [communicationOrder, setCommunicationOrder] = useState(false);
  const [communicationIntervalDay, setCommunicationIntervalDay] = useState(0);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const [communicationOrderQuantitySteps, setCommunicationOrderQuantitySteps] = useState(0);

  const columnsMessagesState = [
    {
      accessorKey: "order",
      id: "order",
      header: "Orden",
    },
    {
      accessorKey: "hour",
      id: "hour",
      header: "Hora",
    },
    {
      accessorKey: "status",
      id: "status",
      header: "Status",
    },
    {
      accessorKey: "title",
      id: "title",
      header: "Título",
    },
    {
      accessorKey: "description",
      id: "description",
      header: "Descripción",
    }
  ];

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  const channelLabels = ()=>{
    let channelsRender = [];
    
    channels.map(channel => {
      switch (channel) {
        case "sms":
          channelsRender.push("Mensaje de texto");
        break;
        case "email":
          channelsRender.push("Correo electrónico");
        break;
        case "call":
          channelsRender.push("Llamada");
        break;
      }
    });

    channelsRender = channelsRender.join(" , ");

    return channelsRender;
  };

  return (  
    <Box sx={{ padding: '25px' }}>
      <Typography display={"flex"} color={"#67AA36"}>
        <b>{`CONFIGURACIÓN ESTADO:`}</b>
        <Typography paddingLeft={2}>
          {configState?.toUpperCase()}
        </Typography>
      </Typography>
      <Grid display="flex" flexDirection="column" gap={2} marginTop={3}>
        <TextField
          select
          fullWidth
          label="Canales de comunicación"
          value={channels}
          onChange={(event) => setChannels(event.target.value)}
          SelectProps={{
            multiple: true,
            renderValue: () => channelLabels()
          }} >
          <MenuItem disabled value="-">
            Selecciona una opción
          </MenuItem>
          <MenuItem value={"sms"}>
            {"Mensaje de Texto"}
          </MenuItem>
          <MenuItem value={"email"}>
            {"Correo Electrónico"}
          </MenuItem>
          <MenuItem value={"call"}>
            {"Llamada"}
          </MenuItem>
        </TextField>
        <Divider color={"#c1c1c1"} size={3} />
        <NumericFormat
          customInput={TextField}
          label="¿Cada cuántos días desea enviar los mensajes?"
          variant="outlined"
          value={communicationIntervalDay}
          sx={{ width: "100%" }}
          thousandSeparator
          onValueChange={({ floatValue }) => setCommunicationIntervalDay(floatValue)}
        />
        <Typography display={"flex"}>
            <Typography color={"#67AA36"} fontWeight={"bold"}>
              {`NOTA:`}
            </Typography>
            <Typography paddingLeft={2}>
              {`Dejar en 0 si se quiere enviar una sola vez los mensajes.`}
            </Typography>
        </Typography>
        <Divider color={"#c1c1c1"} size={3} />
        <Grid display="flex" alignItems="left" gap={1}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={communicationOrder}
                  onChange={({ target }) =>{ 
                    setCommunicationOrder(target.checked);
                    setCommunicationOrderQuantitySteps(0);
                  }}
                />
              }
              label="Mensajeria en orden consecutivo"
            />
          </FormGroup>

          <NumericFormat
            customInput={TextField}
            label="Cantidad de mensajes en orden"
            variant="outlined"
            disabled={(!communicationOrder)}
            value={communicationOrderQuantitySteps}
            sx={{ width: "75%" }}
            thousandSeparator
            onValueChange={({ floatValue }) => setCommunicationOrderQuantitySteps(floatValue)}
          />
        </Grid>
        <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
          <Button onClick={()=>onClose()}>Cancelar</Button>
          <Button variant="contained">
            Grabar
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 10, textAlign: 'right'  }}>
        <Button variant="contained" color="primary" onClick={()=>setOpenStateConfig("new-message")} startIcon={<Message/>}>
          Agregar nuevo mensaje
        </Button>
        <MaterialReactTable
          columns={columnsMessagesState}
          data={messagesList}
          enableColumnFilterModes
          enableColumnOrdering
          enableRowActions
          muiTablePaperProps={{ elevation: 0 }}
          initialState={{ density: "compact" }}
          muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
          state={{ showSkeletons: false }}
          localization={MRT_Localization_ES}
          enablePagination={false}
          renderRowActionMenuItems={({ closeMenu, row: { original } }) => [
            <MenuItem
              key={0}
              disabled={original.status_contracts === 0}
              onClick={() => {
                setOpenStateConfig("update-message")
              }}
            >
              Editar Mensaje
            </MenuItem>,
            <MenuItem
              key={0}
              disabled={original.status_contracts === 0}
              onClick={() => setConfirmDeleteMessage(true)}
            >
              Eliminar Mensaje
            </MenuItem>
          ]}
        />

        <MarketingStateConfigForm 
          modal={openStateConfig}
          channels={channels}
          communicationOrder={communicationOrder}
          onError={(message)=>setFeedback({ open: true, message: message, status: "error" }) }
          onClose={()=>setOpenStateConfig(false)}
          onSubmit={()=>{}}
        />
        
        <Dialog open={confirmDeleteMessage} onClose={()=>setConfirmDeleteMessage(false)}>
          <DialogTitle>{"¿Está seguro que desea eliminar el mensaje del flujo de comunicación?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Esta acción cancelará el envio que se tenga configurado para este mensaje con:</DialogContentText>
            <DialogContentText sx={{ marginTop: 2 }}>
              <label htmlFor="file1">
                <Typography component="span" variant="h4">
                  1. Correo electrónico
                </Typography>
              </label>
              <br />
              <br />
              <label htmlFor="file2">
                <Typography component="span" variant="h4">
                  2. Mensaje de texto
                </Typography>
              </label>
              <br />
              <br />
              <label htmlFor="file2">
                <Typography component="span" variant="h4">
                  3. Llamada
                </Typography>
              </label>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setConfirmDeleteMessage(false)} color="primary">
              Cerrar
            </Button>
            <Button onClick={()=>{}} color="primary">
              Confirmar eliminación
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={feedback.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={resetFeedback}
        >
          <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
            {feedback.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default MarketingStateConfig;
