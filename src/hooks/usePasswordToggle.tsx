import { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const usePasswordToggle = () => {
  const [type, setType] = useState('password');
  const [toggleIcon, setToggleIcon] = useState(<VisibilityOffIcon />);

  const togglePasswordIcon = () => { 
    setType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    setToggleIcon((prevIcon) => (prevIcon.type === VisibilityOffIcon ? <VisibilityIcon/> : <VisibilityOffIcon/>));
  };

  return { type, toggleIcon, togglePasswordIcon };
}