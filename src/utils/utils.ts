import React from 'react';
import { useLocation } from 'react-router-dom';
import { getNamespace } from './strings';

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function isBlockedNS(serviceName: string) {
  return ['pl', 'pl, pl', 'px-operator', 'plc'].includes(getNamespace(serviceName || ''));
}

export function isAllowedNS(serviceName: string) {
  return ['sofa-shop'].includes(getNamespace(serviceName || ''));
}
