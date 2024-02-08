import { Box, Button, Container, FormControl, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PageWrapper from "../Components/PageWrapper";
import { AvoviteWhiteIcon } from "../Components/Icons";

const TicketList = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
            Ticket List
          </Typography>
        </Stack>
        <FormControl variant="outlined" fullWidth onSubmit={handleSubmit} sx={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField name="title" label="Title" fullWidth value={formData.title} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{marginTop:"20px"}}>
                Submit Ticket
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </PageWrapper>
  );
};

export default TicketList;
