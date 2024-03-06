import { IconButton, Box, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Pagination({ currentPage, onPageChange }) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
        <NavigateBeforeIcon />
      </IconButton>
      <Typography variant="body1">{currentPage}</Typography>
      <IconButton onClick={handleNextPage}>
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}

export default Pagination;
