// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Chip, Grid, TableCell, TableRow } from '@mui/material';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { useMemo } from 'react';
import ReactTable from './ReactTable';
import { TableBody } from '@mui/material';

// ==============================|| EXPANDING TABLE - USER DETAILS ||============================== //

const TraceDetails = ({ data }: any) => {
  const theme = useTheme();

  const backColor = alpha(theme.palette.primary.lighter, 0.5);

  const columns = useMemo(
    () => [
      { Header: 'Span Id', accessor: 'span_id', className: 'cell-right' },
      { Header: 'Source', accessor: 'source.label' },
      { Header: 'Destination', accessor: 'destination.label' },
      { Header: 'Time', accessor: 'time_' },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'EXCEPTION':
              return <Chip color="error" label={value} size="small" variant="light" />;
            default:
              return <Chip color="success" label={value} size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Timing',
        accessor: 'latency',
        Cell: ({ value }: { value: number }) => <LinearWithLabel value={value / 1000} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  return (
    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
      <TableCell colSpan={8} sx={{ pl: 0, p: 0, pr: 0, '&:first-of-type, &:last-of-type': { padding: '0px !important' } }}>
        <TableBody sx={{ p: 0 }}>
          <Grid container spacing={0} sx={{ p: 0 }}>
            <Grid item md={12} sx={{ p: 0 }}>
              <ReactTable columns={columns} data={data} />
            </Grid>
          </Grid>
        </TableBody>
      </TableCell>
    </TableRow>
  );
};

export default TraceDetails;
