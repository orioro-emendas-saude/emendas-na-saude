import React, { useMemo } from 'react'
import styled from 'styled-components'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { get } from 'lodash'

const Container = styled.div`
  overflow: auto;

  > table {
    width: 100%;
  }
`

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;

  thead tr {
    background-color: #efefef;
    text-align: left;
  }

  th,
  td {
    padding: 8px 12px;
  }

  tobdy tr {
    border-bottom: 1px solid #dddddd;

    &:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    &:last-of-type {
      border-bottom: 2px solid #009879;
    }
  }
`

export function DataTable({ data, schema, ...props }) {
  const columnHelper = createColumnHelper()
  const columns = useMemo(() => {
    return Object.keys(schema).map((key) => {
      const fmtValue = get(schema, `${key}.fmtValue`)

      return columnHelper.accessor(key, {
        header: get(schema, `${key}.label`) || key,
        cell: (info) => {
          const cellValue = info.getValue()

          return typeof fmtValue === 'function'
            ? fmtValue(cellValue, info.row.original)
            : cellValue
        },
      })
    })
  }, [data])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Container {...props}>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
