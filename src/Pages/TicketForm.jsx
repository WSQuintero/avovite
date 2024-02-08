import { Box, Button, Container, FormControl, Grid, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { AvoviteWhiteIcon } from "../Components/Icons";

const TicketForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    id_type: "",
    id_number: "",
    id_location_expedition: "",
    cellphone: "",
    location_residence: "",
    additional_info: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Solicitud de actualización de datos
          </Typography>
        </Stack>
        <FormControl variant="outlined" fullWidth onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField name="title" label="Título" fullWidth value={formData.title} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={12} style={{ width: "100%", height: "150px" }}>
              <TextareaAutosize
                fullWidth
                name="description"
                aria-label="Descripción del requerimiento"
                placeholder="Descripción del requerimiento"
                value={formData.description}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  height: '150px',
                  resize: 'none',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '16px',
                  color: '#979797',
                  backgroundColor: '#E8E8E8',
                  '&:hover': {
                    borderColor: '#67AA36',
                  },
                  '&:active': {
                    borderColor: '#67AA36',
                    outline: 'none', // Elimina el borde rojo predeterminado del enfoque
                  },
                }}             />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{marginTop:"20px"}}>
                Enviar Solicitud
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </PageWrapper>
  );
};

export default TicketForm;
