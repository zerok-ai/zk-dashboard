import { FC, Fragment } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useExpanded, useTable, Column, HeaderGroup, Cell, Row, useRowSelect, useGroupBy } from 'react-table';

interface TableProps {
  columns: Column[];
  data: any[];
  renderRowSubComponent?: FC<any>;
}

function ReactTable({ columns: userColumns, data, renderRowSubComponent }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable(
    {
      columns: userColumns,
      data,
      expandSubRows: false
    },
    useGroupBy,
    useExpanded,
    useRowSelect
  );

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
      <TableBody {...getTableBodyProps()}>
        {rows.map((row: Row, i: number) => {
          prepareRow(row);
          const rowProps = row.getRowProps();

          return (
            <Fragment key={i}>
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: Cell<{}>) => (
                  <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
              {row.isExpanded && renderRowSubComponent && renderRowSubComponent({ row, rowProps, visibleColumns })}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default ReactTable;
