import { FC, ReactNode } from 'react';

interface ITabPanel {
  index: number;
  value: number;
  children: ReactNode;
}

const TabPanel: FC<ITabPanel> = ({ value, index, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

export default TabPanel;
