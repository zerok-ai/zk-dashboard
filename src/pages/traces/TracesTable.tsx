import { useCallback, useMemo } from 'react';

// material-ui
import { Box } from '@mui/material';

// third-party
import { Row } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import TraceDetails from './TraceDetails';
import ReactTable from './ReactTable';

// assets
import { DownOutlined, RightOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE - EXPANDING TABLE ||============================== //

const TracesTable = ({ data }: { data: any[] }) => {
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
      { Header: 'Trace Id', accessor: 'trace_id' },
      { Header: 'Source', accessor: 'traces[0].source.label' },
      { Header: 'Spans', accessor: 'count' },
      {
        Header: 'Timing',
        accessor: 'traces[0].latency',
        Cell: ({ value }: { value: number }) => <LinearWithLabel value={value / 1000} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  const renderRowSubComponent = useCallback(({ row: { id } }: { row: Row<{}> }) => <TraceDetails data={data[Number(id)].traces} />, [data]);

  return (
    <MainCard title="Expanding User Details" content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
    </MainCard>
  );
};

export default TracesTable;
