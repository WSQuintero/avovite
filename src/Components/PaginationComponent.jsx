import { Pagination } from "@mui/material";

function PaginationComponent({ totalPages, currentPage, onPageChange }) {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Pagination
      count={totalPages !== 0 ? Infinity : 0} // Establecer totalPages como Infinity
      page={currentPage}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
    />
  );
}

export default PaginationComponent;
