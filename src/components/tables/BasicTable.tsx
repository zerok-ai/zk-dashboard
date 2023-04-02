import { useMemo } from 'react';

// material-ui
import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { Column, useTable, HeaderGroup, Cell } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, striped }: { columns: Column[]; data: {}[]; striped?: boolean }) {
  console.log('Reaxct table:', data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: HeaderGroup<{}>) => (
              <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()} {...(striped && { className: 'striped' })}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell: Cell<{}>) => (
                <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ==============================|| REACT TABLE - BASIC ||============================== //

const BasicTable = ({ data, cols, striped, title }: { data: any[]; cols: Column[]; striped?: boolean; title?: string }) => {
  console.log('Basic table:', data);

  const columns = useMemo(() => cols, []);

  return (
    <MainCard content={false} title={title}>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}></Stack>
      <ScrollX>
        <ReactTable columns={columns} data={data} striped={striped} />
      </ScrollX>
    </MainCard>
  );
};

export default BasicTable;
