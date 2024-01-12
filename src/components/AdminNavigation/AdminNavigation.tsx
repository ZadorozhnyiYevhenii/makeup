import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from '@mui/material/Typography';

interface CustomBottomNavigationActionProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  iconColor?: string;
}

const CustomBottomNavigationAction: React.FC<CustomBottomNavigationActionProps> = ({ to, label, icon, iconColor }) => (
  <BottomNavigationAction
    component={({ innerRef, ...props }) => (
      <Link to={to} {...props}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {React.cloneElement(icon as React.ReactElement, { style: { color: iconColor } })}
          <Typography variant="body2" color="textPrimary" sx={{ fontSize: '12px', transition: 'color 0.3s' }}>
            {label}
          </Typography>
        </div>
      </Link>
    )}
  />
);

export const AdminNavigation: React.FC = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <CustomBottomNavigationAction to='/makeup/admin' label='Admin panel' icon={<AdminPanelSettingsIcon />} iconColor="blue" />
        <CustomBottomNavigationAction to='/makeup/user' label="Account" icon={<PersonIcon />} />
        <CustomBottomNavigationAction to='/makeup/admin/addproduct' label="Add product" icon={<AddCircleOutlineIcon />} />
        <CustomBottomNavigationAction to='/makeup/admin/changeproduct' label="Change product" icon={<ManageHistoryIcon />} />
        <CustomBottomNavigationAction to='/makeup/admin/deleteproduct' label="Delete product" icon={<DeleteIcon />} />
      </BottomNavigation>
    </Box>
  );
};
