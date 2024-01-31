import { useState } from "react";
import { Box, ButtonBase, Icon } from "@mui/material";

function formatColor(hex) {
  return String(hex).split("#")[1];
}

function DropzoneImage({ width = "100%", placeholder, value, onChange, children }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(value);

  const handleDrag = (event, status) => {
    event.preventDefault();
    setDragging(status);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    setFile(file);
    onChange(file);
    setDragging(false);
  };

  const handlePick = (event) => {
    event.preventDefault();

    const file = event.target.files[0];

    setFile(file);
    onChange(file);
    setDragging(false);
  };

  return file ? (
    <Box position="relative" display='flex' width={width} sx={{ aspectRatio: 1 }}>
      <Box
        component={ButtonBase}
        color="error"
        position="absolute"
        top={0}
        right={0}
        padding={0.25}
        borderRadius="50%"
        bgcolor="error.light"
        sx={{ transform: "translate(50%, -50%)" }}
        onClick={() => {
          setFile(null);
          onChange(null);
        }}
      >
        <Icon baseClassName="fal" className="fa-times" sx={{ color: "white" }} />
      </Box>
      <img
        src={URL.createObjectURL(file)}
        alt="Previsualización de la imagen"
        width="100%"
        height="100%"
        style={{ objectFit: "contain", borderRadius: 12 }}
      />
    </Box>
  ) : (
    <Box
      position="relative"
      display="flex"
      flexShrink={0}
      justifyContent="center"
      alignItems="center"
      width={width}
      padding={2}
      sx={(t) => ({
        aspectRatio: 1,
        borderRadius: 1,
        ...(dragging
          ? {
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23${formatColor(
                t.palette.primary.main
              )}' stroke-width='4' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
            }
          : {
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23${formatColor(
                t.palette.text.light
              )}' stroke-width='4' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
            }),
      })}
      onDrop={handleDrop}
      onDragOver={(event) => handleDrag(event, true)}
      onDragLeave={(event) => handleDrag(event, false)}
    >
      <img
        src={placeholder}
        alt="placeholder"
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          width: "calc(100% - 64px)",
          height: "calc(100% - 64px)",
          objectFit: "contain",
          opacity: 0.25,
          borderRadius: 16,
        }}
      />
      <input
        type="file"
        accept="image/*"
        style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
        onChange={handlePick}
      />
      {children}
    </Box>
  );
}

export default DropzoneImage;
