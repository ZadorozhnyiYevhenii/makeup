import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IProd } from '../../types/IProduct';

type Props = {
  product: IProd | undefined;
  setSelectedAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const SelectMenu: React.FC<Props> = ({ product, setSelectedAmount }) => {
  const productMl = product?.productVariations.map((pr) => pr?.amount)[0];

  const [ml, setMl] = React.useState(`${productMl}`);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedAmount = parseFloat(event.target.value as string);
    setMl(event.target.value as string);
    setSelectedAmount(selectedAmount);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth style={{ borderColor: 'red' }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ml}
          onChange={handleChange}
          sx={{
            borderColor: 'grey',
            background: 'white',
            outline: 'none',
            '&:focus': {
              borderColor: 'black',
              outline: 'none',
            },
            '&:active': {
              outline: 'none',
              borderColor: 'grey',
            },
          }}
        >
          {product?.productVariations.map((pr) => (
            <MenuItem value={pr.amount} key={pr.id}>
              {pr.amount} ml
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
