import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Tabs.scss';
import { VerticalTabs } from '../TabsDesktop/TabsDesktop';
import { useWindowResize } from '../../hooks/useWindowResize';
import { IProd } from '../../types/IProduct';
import { normalizeName } from '../../helpers/normalizeWord';


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
  product: IProd | undefined,
}

export const BasicTabs: React.FC<Props> = ({ id, product }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const normalizeClassification = normalizeName(product?.classification);

  const normalizeSex = normalizeName(product?.sex);

  const isMobile = useWindowResize(1023);

  return (
    <div className='tabs__wrapper'>
      {isMobile ? (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="primary"
              textColor="inherit"
              orientation='horizontal'
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
          <Box>
            <CustomTabPanel value={value} index={0} >
              <div className='tabs'>
                <ul className='tabs__list'>
                  <li className="tabs__item">
                    <strong>Counrty:</strong> {product?.countryTradeMark.name}
                  </li>
                  <li className="tabs__item">
                    <strong>Made in:</strong> {product?.countriesMadeIn.map(country => country.name)}
                  </li>
                  <li className="tabs__item">
                    <strong>Sex:</strong> {normalizeSex}
                  </li>
                  <li className="tabs__item">
                    <strong>Classification:</strong> {normalizeClassification}
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
        </Box>
      ) : (
        <VerticalTabs id={+id} product={product} />
      )}
    </div>
  );
}