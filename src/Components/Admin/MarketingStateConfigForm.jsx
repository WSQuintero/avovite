import { 
  Box, 
  Chip,
  Grid, 
  Stack as StackMui,
  Button, 
  Dialog,
  Divider,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize
} from '@mui/material';

import JoditEditor from 'jodit-react';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { useState } from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  alignSelf: 'right', 
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MarketingStateConfigForm = ({modal, channels, onClose, onSubmit, onError, communicationOrder}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (collapseContainer) => {
    setExpanded(collapseContainer);
  };
    
  return (
    <Dialog open={modal} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "new-message" ? "Crear nuevo" : "Editar"} mensaje</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={onSubmit}
          >

            <Grid display="flex" flexDirection="column" gap={2}>
              <StackMui direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Orden"
                  name="order"
                  type="number"
                  value={0}
                  disabled={!communicationOrder}
                  onChange={()=>{}}
                  fullWidth
                />
                <TimePicker 
                  label="Hora"
                  name="hour"
                  minutesStep={30}
                />
              </StackMui>
              <Divider color={"#c1c1c1"} size={3} textAlign='left'>
                <Chip 
                  label="Mensaje para Correo electrónico" 
                  color="success"
                  sx={{ width: '280px' }}
                  variant="outlined" 
                  size="small" 
                />
                <ExpandMore
                  expand={(expanded=="email")}
                  onClick={()=>{
                    if(channels.indexOf("email")>=0){
                      handleExpandClick(expanded !== "email" && "email");
                    }else{
                      onError("El estado no tiene habilitada la opción para enviar correos electrónicos");
                    }
                  }}
                  aria-expanded={(expanded=="email")}>
                  <ExpandMoreIcon />
                </ExpandMore>
              </Divider>
              <Collapse in={(expanded=="email")} timeout="auto" unmountOnExit>
                <StackMui spacing={2}>
                  <TextField
                    label="Asunto"
                    name="title"
                    onChange={()=>{}}
                    fullWidth
                  />
                  <JoditEditor
                    config={{
                      toolbarAdaptive: false,
                      placeholder: 'Digita el contenido del correo electrónico',
                      buttons: 'bold, italic, underline, strikethrough, font, fontsize, paragraph, align, superscript, subscript, ul, ol, hr, undo, redo',
                    }}
                    tabIndex={1} // tabIndex of textarea
                    onChange={(newContent) => {}}
                  />
                </StackMui>
              </Collapse>
              <Divider color={"#c1c1c1"} size={3} textAlign='left'>
                <Chip 
                  label="Texto para Mensaje de texto" 
                  color="success"
                  sx={{ width: '280px' }}
                  variant="outlined" 
                  size="small" 
                />
                <ExpandMore
                  expand={(expanded=="sms")}
                  onClick={()=>{
                    if(channels.indexOf("sms")>=0){
                      handleExpandClick(expanded !== "sms" && "sms");
                    }else{
                      onError("El estado no tiene habilitada la opción para enviar mensajes de texto");
                    }
                  }}
                  aria-expanded={(expanded=="sms")}>
                  <ExpandMoreIcon />
                </ExpandMore>
              </Divider>
              <Collapse in={(expanded=="sms")} timeout="auto" unmountOnExit>
                <StackMui direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextareaAutosize
                      fullWidth
                      name="description"
                      style={{
                        width: "100%",
                        height: "120px",
                        resize: "none",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "10px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "16px",
                        color: "#979797",
                        backgroundColor: "#fff",
                        outline: "none",
                        padding: "10px",
                        outlineColor: "#67AA36",
                        "&:hover": {
                          borderColor: "#67AA36",
                          outline: "solid 1px #67AA36",
                        },
                        "&:focus": {
                          borderColor: "#67AA36",
                          outline: "none", // Elimina el borde rojo predeterminado del enfoque
                        },
                      }}
                  />
                </StackMui>
              </Collapse>
              <Divider color={"#c1c1c1"} size={3} textAlign='left'>
                <Chip 
                  label="Diálogo para Llamada" 
                  color="success"
                  sx={{ width: '280px' }}
                  variant="outlined" 
                  size="small" 
                />
                <ExpandMore
                  expand={(expanded=="call")}
                  onClick={()=>{
                    if(channels.indexOf("call")>=0){
                      handleExpandClick(expanded !== "call" && "call");
                    }else{
                      onError("El estado no tiene habilitada la opción para realizar llamadas");
                    }
                  }}
                  aria-expanded={(expanded=="call")}>
                  <ExpandMoreIcon />
                </ExpandMore>
              </Divider>
              <Collapse in={(expanded=="call")} timeout="auto" unmountOnExit>
                <StackMui direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextareaAutosize
                      fullWidth
                      name="description"
                      style={{
                        width: "100%",
                        height: "120px",
                        resize: "none",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "10px",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "16px",
                        color: "#979797",
                        backgroundColor: "#fff",
                        outline: "none",
                        padding: "10px",
                        outlineColor: "#67AA36",
                        "&:hover": {
                          borderColor: "#67AA36",
                          outline: "solid 1px #67AA36",
                        },
                        "&:focus": {
                          borderColor: "#67AA36",
                          outline: "none", // Elimina el borde rojo predeterminado del enfoque
                        },
                      }}
                  />
                </StackMui>
              </Collapse>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={onSubmit} variant="contained">
              Grabar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
  );
};

export default MarketingStateConfigForm;
