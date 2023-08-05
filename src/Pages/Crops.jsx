import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography, Box } from "@mui/material";
import { AndroidOutlined as SampleIcon } from "@mui/icons-material";
import PageWrapper from "../Components/PageWrapper";
import { formatDate } from "../utilities";

const CardCrop = ({ title, description, date, sx, onClick }) => (
  <Grid display="flex" flexDirection="column" gap={2} sx={sx}>
    <Grid display="flex" alignItems="center" gap={2}>
      <SampleIcon color="primary" />
      <Grid display="flex" flexDirection="column">
        <Typography variant="h3" lineHeight={1}>
          {title}
        </Typography>
        <Typography color="primary" lineHeight={1}>
          {description}
        </Typography>
        <Typography variant="caption">{formatDate(date)}</Typography>
      </Grid>
    </Grid>
    <Box width="100%" border={1} sx={{ aspectRatio: 2 }} />
    <Button variant="text" onClick={onClick}>
      Detalles
    </Button>
  </Grid>
);

const crops = [
  {
    id: 1,
    title: "Crop 1",
    description: "80 Kg",
    date: "04/02/2023",
  },
  {
    id: 2,
    title: "Crop 2",
    description: "80 Kg",
    date: "04/02/2023",
  },
  {
    id: 3,
    title: "Crop 3",
    description: "80 Kg",
    date: "04/02/2023",
  },
  {
    id: 4,
    title: "Crop 4",
    description: "80 Kg",
    date: "04/02/2023",
  },
];

function Crops() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState({
    id: 4,
    title: "Crop 4",
    description: "80 Kg",
    date: "04/02/2023",
  });

  return (
    <PageWrapper>
      {!id ? (
        <Grid display="flex" flexWrap="wrap" gap={2}>
          {crops.map((crop) => (
            <CardCrop
              key={crop.id}
              title={crop.title}
              description={crop.description}
              date={crop.date}
              sx={(t) => ({
                width: "calc(25% - 12px)",
                [t.breakpoints.down("lg")]: {
                  width: "calc(50% - 8px)",
                },
                [t.breakpoints.down("md")]: {
                  width: "100%",
                },
              })}
              onClick={() => navigate(`/crops/${crop.id}`)}
            />
          ))}
        </Grid>
      ) : (
        <Grid display="flex" flexDirection="column" gap={2}>
          <Grid display="flex" flexDirection="column" alignItems="center" gap={2}>
            <SampleIcon color="primary" />
            <Typography variant="h2" lineHeight={1}>
              {crop.title}
            </Typography>
            <Typography fontWeight={600} color="primary" lineHeight={1}>
              {crop.description}
            </Typography>
            <Typography lineHeight={1}>Fecha de la última cosecha</Typography>
            <Typography color="primary" lineHeight={1}>
              {formatDate(crop.date)}
            </Typography>
          </Grid>
          <Grid display="flex" flexDirection="column" gap={2}>
            <Grid display="flex" flexDirection="column">
              <Typography color="primary">Cosechas generales</Typography>
              <Typography>300 Kg</Typography>
            </Grid>
            <Grid display="flex" flexDirection="column">
              <Typography color="primary">Cantidad de producción</Typography>
              <Typography>50 Toneladas</Typography>
            </Grid>
            <Grid display="flex" flexDirection="column">
              <Typography color="primary">Fecha de recolección</Typography>
              <Typography>{formatDate(crop.date)}</Typography>
            </Grid>
            <Grid display="flex" flexDirection="column">
              <Typography color="primary">Fecha de la última cosecha</Typography>
              <Typography>{formatDate(crop.date)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </PageWrapper>
  );
}

export default Crops;
