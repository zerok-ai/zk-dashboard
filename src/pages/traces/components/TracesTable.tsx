import { useCallback, useMemo } from 'react';

// material-ui
import { Box, Badge, Typography } from '@mui/material';

// third-party
import { Row } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import TraceDetails from './TraceDetails';
import ReactTable from './ReactTable';

import Moment from 'react-moment';

// assets
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import TraceSnapshot from './TraceSnapshot';

// ==============================|| REACT TABLE - EXPANDING TABLE ||============================== //

const TracesTable = ({ data, traceModal }: { data: any[]; traceModal?: any }) => {
  function traceContainsException(traceId: string): Number {
    const traceSpans = data.filter((x) => x.trace_id === traceId)[0];
    console.log('>', traceSpans);
    const exceptionCount = traceSpans?.traces.filter((span: any) => span?.type === 'EXCEPTION').length;
    return exceptionCount;
  }

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        className: 'cell-center',
        Cell: ({ row }: { row: Row }) => {
          const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
          return (
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
              {collapseIcon}
            </Box>
          );
        },
        SubCell: () => null
      },
      {
        Header: 'Trace Id',
        accessor: 'trace_id',
        Cell: ({ value, row }: { value: string; row: Row }) => {
          const count = traceContainsException(value);
          return (
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
              <Badge color="error" badgeContent={count} invisible={count <= 0}>
                <Typography sx={{ textTransform: 'none', fontFamily: 'monospace' }}>{value}</Typography>
              </Badge>
            </Box>
          );
        }
      },
      { Header: 'Source', accessor: 'traces[0].source.label' },
      { Header: 'Spans', accessor: 'count' },
      {
        Header: 'Time',
        accessor: 'traces[0].time_',
        Cell: ({ value }: { value: string }) => {
          return <Moment date={value} fromNow ago />;
        }
      },
      {
        Header: 'Timing',
        accessor: 'traces',
        Cell: ({ value }: { value: any[] }) => <TraceSnapshot spans={value} />
      }
    ],
    []
  );

  const renderRowSubComponent = useCallback(
    ({ row: { id } }: { row: Row<{}> }) => <TraceDetails data={data[Number(id)].traces} traceModal={traceModal} />,
    [data, traceModal]
  );

  return (
    <MainCard title="Distributed Traces" content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
    </MainCard>
  );
};

export default TracesTable;
