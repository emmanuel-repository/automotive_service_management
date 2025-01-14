import { Button } from '@/components/ui/button';

export function getColumns() {

  const keysColums = [
    { keyColumn: 'plate_number', description: 'Numero de Placa' },
    { keyColumn: 'model', description: 'Modelo' },
    { keyColumn: 'year', description: 'Año' },
  ];

  const columns = keysColums.map((item) => {
    
    return {
      accessorKey: item.keyColumn,
      header: ({ column }) => {

        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} 	>
            {item.description}
          </Button>
        );

      },
      cell: ({ row }) => <div className="uppercase" > {row.getValue(item.keyColumn)} </div>,
    };
    
  });


  // columns.push(getColumnsAction(handleEdit, handleDelete, redirect))

  return columns;
}
