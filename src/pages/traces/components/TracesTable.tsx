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
import { getWorkloadName, getNamespace, getPartsOfPath } from 'utils/strings';
import { getSpanChip } from 'utils/chips';

// ==============================|| REACT TABLE - EXPANDING TABLE ||============================== //

const TracesTable = ({ data, traceModal }: { data: any[]; traceModal?: any }) => {
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
        Header: 'Type',
        accessor: 'traces[0].type',
        id: 'traces[0].type',
        Cell: ({ value, row }: { value: any; row: Row }) => {
          const item: any = row.original;
          const count = item.traces.filter((x: any) => x.type === 'EXCEPTION').length;
          const nonExceptionSpan = item.traces.filter((x: any) => x.type !== 'EXCEPTION')[0];
          return (
            <Box {...row.getToggleRowExpandedProps()}>
              <Badge color="error" badgeContent={count} invisible={count <= 0}>
                {getSpanChip(nonExceptionSpan)}
              </Badge>
            </Box>
          );
        }
      },
      {
        Header: 'Source',
        accessor: 'traces[0].source.label',
        Cell: ({ value, row }: { value: string; row: Row }) => {
          const item: any = row.original;
          const nonExceptionSpan = item.traces.filter((x: any) => x.type !== 'EXCEPTION')[0];
          return (
            <Box {...row.getToggleRowExpandedProps()}>
              <Typography>
                {getNamespace(nonExceptionSpan.source.label) + ' / ' + getWorkloadName(nonExceptionSpan.source.label)}
              </Typography>
            </Box>
          );
        }
      },
      {
        Header: 'Destination',
        accessor: 'traces[0].destination.label',
        Cell: ({ value, row }: { value: string; row: Row }) => {
          const item: any = row.original;
          const nonExceptionSpan = item.traces.filter((x: any) => x.type !== 'EXCEPTION')[0];
          return (
            <Box {...row.getToggleRowExpandedProps()}>
              <Typography>
                {getNamespace(nonExceptionSpan.destination.label) + ' / ' + getWorkloadName(nonExceptionSpan.destination.label)}
              </Typography>
            </Box>
          );
        }
      },
      {
        Header: 'Endpoint',
        accessor: 'traces[0].req_path',
        Cell: ({ value, row }: { value: string; row: Row }) => {
          const item: any = row.original;
          const nonExceptionSpan = item.traces.filter((x: any) => x.type !== 'EXCEPTION')[0];
          const { path } = getPartsOfPath(nonExceptionSpan.req_path);
          return (
            <Box {...row.getToggleRowExpandedProps()}>
              <Typography>{path || '-'}</Typography>
            </Box>
          );
        }
      },
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
