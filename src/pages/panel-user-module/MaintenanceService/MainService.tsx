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
import { successAlert, infoAlert } from "@/pages/Swal";
import maintenanceService from "@/core/services/maintenance.service";
import MaintenanceRegister from "./MaintenanceRegister";
import { useParams } from 'react-router-dom';
import { MaintenanceEdit } from "./MaintenanceEdit";


export default function MainService() {

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [columns, setDataColumns] = useState([]);
  const [data, setDataService] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formEdit, setFormEdit] = useState({ plate_number: "", model: "", year: "", });
  const { id } = useParams();

  useEffect(() => {

    const getDataRecord = async () => {

      const dataColumns = getColumns(handleEdit, handleDelete);
      const dataResult = await maintenanceService.getMaintenance(id);

      setDataColumns(dataColumns)
      setDataService(dataResult.maintenance_services);
    }

    getDataRecord();
  }, []);

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
    data["slugCar"] = id

    const result = await maintenanceService.saveMaintenance(data)

    if (result.errors) {
      setErrors(result.errors)
      return
    }

    setDataService((prevData) => [...prevData, result.maintenance_service]);
    setErrors([])
    successAlert("Si se guardaron los dato")
  };

  const handleSubmitEdit = async () => {

    console.log(formEdit.slug)

    const result = await maintenanceService.editMaintenance(formEdit)

    if (result.errors) {
      // setErrorsEdit(result.errors)
      infoAlert(JSON.stringify(result.errors), "¡Verificar!");
      setIsDialogOpen(false);
      return
    }

    setDataService((prevData) =>
      prevData.map((record) =>
        record.slug === result.maintenance_service.slug ? { ...record, ...result.maintenance_service } : record
      )
    );
    setIsDialogOpen(false);

  };

  const handleFormChange = (newFormData) => {
    setFormEdit(newFormData);
  };

  const handleEdit = (data) => {

    const formattedDate = new Date(data.date).toISOString().split('T')[0];

    data.date = formattedDate

    setIsDialogOpen(true);
    setFormEdit(data)
  }

  const handleDelete = async (data) => {
    const result = await maintenanceService.deleteMaintenance(data.slug)

    if (result.errors) {
      setErrors(result.errors)
      return
    }

    setDataService((prevData) => prevData.filter(item => item.slug !== data.slug));
  }

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
          <MaintenanceRegister handleSubmitCallback={handleFormSubmit} />
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

      <MaintenanceEdit
        open={isDialogOpen}
        onClose={closeDialog}
        data={formEdit} // Datos seleccionados para edición
        onChange={handleFormChange} // Actualiza el estado del formulario
        onSubmit={handleSubmitEdit} // Maneja el envío del formulario
      />

    </>
  )
}

function getColumns(handleEdit, handleDelete) {

  const keysColums = [
    { keyColumn: 'description', description: 'Descripcion' },
    { keyColumn: 'date', description: 'Fecha' },
    { keyColumn: 'status', description: 'Estatus' },
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

  columns.push(getColumnsAction(handleEdit, handleDelete))

  return columns;
}

function getColumnsAction(handleEdit, handleDelete) {

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

                <DropdownMenuItem onClick={() => { handleEdit(row.original) }}>
                  <span>Actualizar</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => { handleDelete(row.original) }}>
                  <span>Eliminar</span>
                </DropdownMenuItem>

              </DropdownMenuGroup>

            </DropdownMenuContent>

          </DropdownMenu >

        </>
      )
    }
  };

}