import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import { Employee } from '../types';
import { format } from 'date-fns';

interface AttendanceTableProps {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor('fullName', {
    header: 'Nombre Empleado',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Fecha',
    cell: (info) => format(new Date(info.getValue()), 'dd/MM/yyyy'),
  }),
  columnHelper.accessor('checkIn', {
    header: 'Hora Entrada',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('checkOut', {
    header: 'Hora Salida',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Estado',
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          info.getValue() === 'present'
            ? 'bg-green-100 text-green-800'
            : info.getValue() === 'absent'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
      </span>
    ),
  }),
  columnHelper.accessor((row) => row, {
    id: 'actions',
    header: 'Acciones',
    cell: (info) => {
      const employee = info.getValue();
      return (
        <div className="flex gap-2">
          <button
            onClick={() => info.table.options.meta?.onEdit(employee)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => info.table.options.meta?.onDelete(employee)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      );
    },
  }),
];

export function AttendanceTable({
  data,
  onEdit,
  onDelete,
}: AttendanceTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'date', desc: false },
    { id: 'fullName', desc: false }
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    meta: {
      onEdit,
      onDelete,
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}