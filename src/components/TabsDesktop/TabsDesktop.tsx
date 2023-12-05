import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { products } from '../../MockProducts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

type Props = {
  id: number,
}

export const VerticalTabs: React.FC<Props> = ({ id }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const product = products.find(prod => prod.id === +id);


  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', gap: 10 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'black',
          },
          '& .MuiTab-root': {
            color: 'grey',
            '&.Mui-selected': {
              color: 'black',
            },
          },
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Tab label="Characteristics" {...a11yProps(0)} />
        <Tab label="Description" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='tabs__paragraph'>
          {product?.description}
        </div>
      </TabPanel>
    </Box>
  );
}