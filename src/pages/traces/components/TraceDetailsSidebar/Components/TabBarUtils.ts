import { ReactNode } from 'react';

// types

export type TraceDetailsProps = {
  modalData: any;
};

export interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export const JSONStyle = {
  maxHeight: '50vh',
  overflowY: 'scroll',
  span: {
    color: 'rgba(255,255,255,0.5) !important'
  },
  '.data-key': {
    color: 'rgba(255,255,255,0.8) !important'
  }
};

export function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}
