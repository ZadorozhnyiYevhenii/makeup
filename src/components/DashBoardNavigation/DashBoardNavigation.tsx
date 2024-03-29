import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const DashBoardNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       navigation
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to='/makeup/admin'>
            Dashboard menu
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/makeup/admin/addproduct'>
            Add
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/makeup/admin/changeproduct'>
            Change
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/makeup/admin/deleteproduct'>
            Delete
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}