import { Pagination } from "@mui/material";

function PaginationComponent({ totalPages, currentPage, onPageChange }) {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return <Pagination count={totalPages} page={currentPage} onChange={handleChange} variant="outlined" shape="rounded" />;
}

export default PaginationComponent;
