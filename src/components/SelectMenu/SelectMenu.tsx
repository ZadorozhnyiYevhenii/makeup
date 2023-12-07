import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const SelectMenu = () => {
  const [ml, setMl] = React.useState('30');

  const handleChange = (event: SelectChangeEvent) => {
    setMl(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth style={{borderColor: 'red',}}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ml}
          onChange={handleChange}
        >
          <MenuItem value={30}>30ml</MenuItem>
          <MenuItem value={60}>60ml</MenuItem>
          <MenuItem value={100}>100ml</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}