import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';

type Props = {
  pageNumber: number | undefined;
  onPageChange: (page: number) => void;
};

export const PaginationRounded: React.FC<Props> = ({ pageNumber, onPageChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageParam = new URLSearchParams(location.search).get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
    navigate(`${location.pathname}?page=${value}`);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={pageNumber} shape="rounded" page={currentPage} onChange={handleChange} />
    </Stack>
  );
};
