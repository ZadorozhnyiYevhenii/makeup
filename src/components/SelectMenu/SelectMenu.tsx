import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IProd } from '../../types/IProduct';

type Props = {
  product: IProd | undefined,
}

export const SelectMenu: React.FC<Props> = ({ product }) => {
  const productMl = product?.productVariations.map(pr => pr.amount)[0];

  const [ml, setMl] = React.useState(`${productMl}`);

  const handleChange = (event: SelectChangeEvent) => {
    setMl(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth style={{ borderColor: 'red', }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ml}
          onChange={handleChange}
        >
          {product?.productVariations.map(pr => (
            <MenuItem value={pr.amount} key={pr.id}>
              {pr.amount} ml
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}