import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table"
import { useEffect, useState } from "react";
import { TableHeaderCustom } from "@/components/custom/TableHeaderCustom";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PaginationTableCustom } from "@/components/custom/PaginationTableCustom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import carService from "@/core/services/CarService";
import RegisterCar from "./RegisterCar";
import {EditCar} from "./EditCar";

export default function MainCar() {

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [columns, setDataColumns] = useState([]);
  const [data, setDataRecord] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formEdit, setFormEdit] = useState({ plateNumber: "", model: "", year: "", });

  useEffect(() => {

    const getDataRecord = async () => {

      const dataColumns = getColumns(handleEdit);
      const dataResult = await carService.getCars();

      setDataColumns(dataColumns)
      setDataRecord(dataResult.cars);
    }

    getDataRecord();
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  const closeDialog = () => {
    setIsDialogOpen(false); // Cerrar el diálogo}
  };

  const handleFormSubmit = async (data) => {

    const result = await carService.saveDataCar(data)

    if (result.errors) {
      setErrors(result.errors)
      return
    }

    setDataRecord((prevData) => [...prevData, result.car]);
    setErrors([])
  };

  const handleEdit = (data) => {
    setIsDialogOpen(true);
    setFormEdit(data)
  }

  const handleSubmitEdit = () => {
    console.log("Datos enviados al backend:", formEdit);
  };

  const handleFormChange = (newFormData) => {
    setFormEdit(newFormData);
    console.log("Datos actualizados desde el formulario:", newFormData);
  };

  return (
    <>

      <div className="pt-10">
        {errors.length > 0 &&
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <ul>
                {errors.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        }
      </div>

      <div className="flex flex-row">

        <div className="pt-10">
          <RegisterCar handleSubmitCallback={handleFormSubmit} />
        </div>

        <div className="pt-10 ml-4 flex-grow">
          <Card >
            <CardHeader>

            </CardHeader>
            <CardContent>
              <Table>
                <TableHeaderCustom table={table} />
                <TableBodyCustom table={table} columns={columns} />
              </Table>

              <div className="pt-8">
                <PaginationTableCustom table={table} />
              </div>

            </CardContent>
          </Card>
        </div>
      </div>

      <EditCar
        open={isDialogOpen}
        onClose={closeDialog}
        data={formEdit} // Datos seleccionados para edición
        onChange={handleFormChange} // Actualiza el estado del formulario
        onSubmit={handleSubmitEdit} // Maneja el envío del formulario
      />
    </>
  )

}

function getColumns(handleEdit) {

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
        )

      },
      cell: ({ row }) => <div className="uppercase" > {row.getValue(item.keyColumn)} </div>,
    };
  });

  columns.push(getColumnsAction(handleEdit))

  return columns;
}

function getColumnsAction(handleEdit) {

  return {
    id: "actions",
    enableHiding: false,
    header: 'Acciones',
    cell: ({ row }) => {

      return (
        <>
          <DropdownMenu>

            <DropdownMenuTrigger asChild>
              <Button size="lg" variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">

              <DropdownMenuGroup>

                {/* <DropdownMenuItem onClick={() => { handleDetailt(row.original) }}>
                  <span>Mostrar Servicios</span>
                </DropdownMenuItem> */}

                <DropdownMenuItem onClick={() => { handleEdit(row.original) }}>
                  <span>Actualizar</span>
                </DropdownMenuItem>

                {/* <DropdownMenuItem onClick={() => { handleDelete(row) }}>
                  <span>Elimiar</span>
                </DropdownMenuItem> */}

              </DropdownMenuGroup>

            </DropdownMenuContent>

          </DropdownMenu >

        </>
      )
    }
  };

}