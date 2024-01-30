import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
  pageNumber: number;
  onPageChange: (page: number) => void,
}

export const PaginationRounded: React.FC<Props> = ({ pageNumber, onPageChange }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={pageNumber} shape="rounded" onChange={handleChange} />
    </Stack>
  );
};