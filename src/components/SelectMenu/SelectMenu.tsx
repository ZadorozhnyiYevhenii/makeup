import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IProd } from '../../types/IProduct';

type Props = {
  product: IProd | undefined;
  setSelectedAmount: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SelectMenu: React.FC<Props> = ({ product, setSelectedAmount }) => {
  const productMl = product?.productVariations.map((pr) => pr?.variationName)[0];

  const [ml, setMl] = React.useState(`${productMl}`);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedAmount = event.target.value;
    setMl(event.target.value as string);
    setSelectedAmount(selectedAmount);
  };

  const handleOptionHover = (pr: Pick<IProd, 'variationName' | 'id'>) => {
    const selectedAmount = pr.variationName;
    setMl(`${pr.variationName}`);
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
          MenuProps={{ style: { maxHeight: '180px'} }}
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
            overflow: 'hidden',
          }}
        >
          {product?.productVariations.map((pr) => (
            <MenuItem
              value={pr.variationName}
              key={pr.id}
              onMouseOver={() => handleOptionHover(pr)}
            >
              {pr.variationName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
