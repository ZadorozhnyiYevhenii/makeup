import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { products } from '../../MockProducts';
import './Tabs.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type Props = {
  id: number,
}

export const  BasicTabs:React.FC<Props> = ({ id }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const product = products.find(prod => prod.id === +id);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',  }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example" 
          indicatorColor="primary" 
          textColor="inherit"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'black',
            },
            '& .MuiTab-root': {
              color: 'grey',
            },
            '& .Mui-selected': {
              color: 'black',
            },
            '& .MuiTab-textColorInherit.Mui-selected:hover': {
              color: 'black',
            },
          }}
        >
           <Tab 
            label="Characteristics" 
            {...a11yProps(0)} 
          />
          <Tab 
            label="Description" 
            {...a11yProps(1)} 
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className='tabs'>
          <ul className='tabs__list'>
            <li className="tabs__item">
              <strong>Counrty:</strong> {product?.country}
            </li>
            <li className="tabs__item">
              <strong>Made in:</strong> {product?.country}
            </li>
            <li className="tabs__item">
              <strong>Sex:</strong> {product?.sex}
            </li>
            <li className="tabs__item">
              <strong>Flavor type:</strong> {product?.smellType}
            </li>
            <li className="tabs__item">
              <strong>Starting note:</strong> {product?.начальнаяНота}
            </li>
            <li className="tabs__item">
              <strong>Heart note:</strong> {product?.нотаСердца}
            </li>
            <li className="tabs__item">
              <strong>Ending note:</strong> {product?.конечнаяНота}
            </li>
          </ul>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className='tabs__paragraph'>
          {product?.description}
        </div>
      </CustomTabPanel>
    </Box>
  );
}