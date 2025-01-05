import { flexRender } from "@tanstack/react-table"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"

export function TableBodyCustom({ table, columns }) {

  return (
    <>

      <TableBody>

        {
          table.getRowModel().rows?.length && (table.getRowModel().rows.map((row) => (

            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} 	>

              {

                row.getVisibleCells().map((cell) => (

                  <TableCell key={cell.id} className="text-center p-1 ">
                    {
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  </TableCell>

                ))

              }

            </TableRow>

          ))

          )
        }

        {
          !table.getRowModel().rows?.length &&
          (
            <TableRow>

              <TableCell colSpan={columns?.length} className="h-24 text-center" 	>
                No hay resultado.
              </TableCell>

            </TableRow>
          )
        }

      </TableBody>
    </>
  )
}