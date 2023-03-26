// material-ui
import { useMemo } from 'react';

import { alpha, useTheme } from '@mui/material/styles';
import { Button, TableBody } from '@mui/material';
import { Chip, TableCell, TableRow } from '@mui/material';

import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import ReactTable from './ReactTable';
import Moment from 'react-moment';

// ==============================|| EXPANDING TABLE - USER DETAILS ||============================== //

const TraceDetails = ({ data, traceModal }: any) => {
  const theme = useTheme();

  const backColor = alpha(theme.palette.primary.lighter, 0.5);
  console.log(traceModal);
  const columns = useMemo(
    () => [
      {
        Header: 'Span Id',
        accessor: 'span_id',
        className: 'cell-right',
        Cell: ({ value }: { value: string }) => {
          const spanData = data.filter((x: any) => x.span_id === value)[0];
          return (
            <>
              <Button
                variant="text"
                color="info"
                onClick={() => {
                  traceModal.setModalData(spanData);
                  traceModal.setOpen(true);
                }}
              >
                {value}
              </Button>
            </>
          );
        }
      },
      { Header: 'Source', accessor: 'source.label' },
      {
        Header: 'Destination',
        accessor: 'destination.label',
        Cell: ({ value }: { value: string }) => {
          return value.includes('zerok-operator-system') ? <>ZeroK Exception Handler</> : <>{value}</>;
        }
      },
      { Header: 'Time', accessor: 'time_', Cell: ({ value }: { value: string }) => <Moment date={value} format="DD-MM-YY HH:mm:ss.SSS" /> },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'EXCEPTION':
              return <Chip color="error" label={value} size="small" />;
            default:
              return <Chip color="success" label={value} size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Timing',
        accessor: 'latency',
        Cell: ({ value }: { value: number }) => <LinearWithLabel value={value * 1000} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  // const [showBody, setShowBody] = useState(false);

  return (
    <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
      <TableCell colSpan={7} sx={{ pl: 0, p: 0, pr: 0, '&:first-of-type, &:last-of-type': { padding: '0px !important' } }}>
        <TableBody sx={{ p: 0, display: 'block' }}>
          <ReactTable columns={columns} data={data} />
        </TableBody>
      </TableCell>
    </TableRow>
  );
};

export default TraceDetails;
