// material-ui
import { ReactChild, useMemo } from 'react';

import { alpha, useTheme } from '@mui/material/styles';
import { Box, Divider, TableBody, Typography } from '@mui/material';
import { TableCell, TableRow } from '@mui/material';

// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import ReactTable from './ReactTable';
import Moment from 'react-moment';
import TraceSnapshot from './TraceSnapshot';
import { getNamespace, getPartsOfPath, getWorkloadName } from 'utils/strings';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { getSpanChip } from 'utils/chips';
// ==============================|| EXPANDING TABLE - USER DETAILS ||============================== //

const TraceDetails = ({ data, traceModal }: any) => {
  const theme = useTheme();

  const getBoxWrapper = (row: any, children: ReactChild) => {
    const spanData = data.filter((x: any) => x.span_id === row.original.span_id)[0];
    return (
      <Box
        onClick={(event: any) => {
          traceModal.setModalData(spanData);
          traceModal.setOpen(true);
        }}
        sx={{ cursor: 'pointer' }}
      >
        {children}
      </Box>
    );
  };

  const backColor = alpha(theme.palette.primary.lighter, 0.5);
  console.log(traceModal);
  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'span_id',
        className: 'cell-center',
        Cell: ({ value, row }: { value: string; row: any }) =>
          getBoxWrapper(row, <SubdirectoryArrowRightIcon style={{ fontSize: '16px', color: theme.palette.secondary.lighter }} />)
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value, row }: { value: string; row: any }) => {
          return getBoxWrapper(row, getSpanChip(row.original));
        }
      },
      {
        Header: 'Source',
        accessor: 'source.label',
        Cell: ({ value, row }: { value: string; row: any }) => {
          return getBoxWrapper(row, <Typography>{getNamespace(value) + ' / ' + getWorkloadName(value)}</Typography>);
        }
      },
      {
        Header: 'Destination',
        accessor: 'destination.label',
        Cell: ({ value, row }: { value: string; row: any }) => {
          return row.original.type === 'EXCEPTION'
            ? getBoxWrapper(row, <Typography>{'ZeroK Exception Agent'}</Typography>)
            : getBoxWrapper(row, <Typography>{getNamespace(value) + ' / ' + getWorkloadName(value)}</Typography>);
        }
      },
      {
        Header: 'Endpoint',
        accessor: 'req_path',
        Cell: ({ value, row }: { value: string; row: any }) => {
          const { path } = getPartsOfPath(value);
          return row.original.type === 'EXCEPTION'
            ? getBoxWrapper(row, <>-</>)
            : getBoxWrapper(row, <Typography>{path || '-'}</Typography>);
        }
      },

      {
        Header: 'Response Time',
        accessor: 'time_',
        Cell: ({ value }: { value: string }) => <Moment date={value} format="DD-MM-YY HH:mm:ss.SSS" />
      },
      {
        Header: 'Timing',
        accessor: 'span_id',
        id: 'span_id + latency',
        Cell: ({ value, data }: { value: string; data: any }) => <TraceSnapshot spans={data} spanId={value} />
      }
    ],
    [data, traceModal]
  );

  // const [showBody, setShowBody] = useState(false);

  return (
    <TableRow sx={{ bgcolor: `${backColor} !important`, '&:hover': { bgcolor: `${backColor} !important` } }}>
      <TableCell colSpan={8} sx={{ pl: 0, p: 0, pr: 0, '&:first-of-type, &:last-of-type': { padding: '0px !important' } }}>
        <TableBody sx={{ pb: 0, display: 'block' }}>
          <ReactTable columns={columns} data={data} />
        </TableBody>
        <Divider variant="fullWidth" sx={{ background: 'black', pb: 0.1 }} />
      </TableCell>
    </TableRow>
  );
};

export default TraceDetails;
