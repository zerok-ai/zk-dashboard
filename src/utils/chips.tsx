import { Chip } from '@mui/material';

export const getChipColor = (reqType: string, method: string) => {
  switch (reqType) {
    case 'EXCEPTION':
      return 'error';
    case 'MYSQL':
      return 'info';
    case 'HTTP':
      switch (method) {
        case 'GET':
          return 'success';
        case 'POST':
        case 'PUT':
          return 'warning';
        case 'DELETE':
          return 'error';
        default:
          return 'warning';
      }
  }
  return 'warning';
};

export const getChipLabel = (reqType: string, method: string): string => {
  if (reqType === 'HTTP') return method;
  return reqType;
};

export const getSpanChip = (spanItem: any) => {
  const type = spanItem.type;
  const method = spanItem.req_method;
  return (
    <Chip
      color={getChipColor(type, method)}
      label={getChipLabel(type, method)}
      size="small"
      variant="combined"
      sx={{ cursor: 'pointer' }}
    />
  );
};
