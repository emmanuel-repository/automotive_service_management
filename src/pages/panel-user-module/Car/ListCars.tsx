import { getColumns } from "@/lib/tables.configs";
import { useEffect, useMemo, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import carService from "@/core/services/CarService";
import { Table } from "@/components/ui/table";
import { TableHeaderCustom } from "@/components/custom/TableHeaderCustom";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import { PaginationTableCustom } from "@/components/custom/PaginationTableCustom";


export default function ListCars({dataCar = {}}) {

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [carList, setCarList] = useState([]);  // Añadir estado para los coches

  const { data: fetchedCarList } = useApi(carService.getCars);

  const columns = useMemo(() => getColumns(), []);

  // Actualiza la lista de coches con los datos obtenidos del API
  useEffect(() => {
    if (fetchedCarList && fetchedCarList.cars) setCarList(fetchedCarList.cars);
  }, [fetchedCarList]);

  // Actualiza la lista de coches cuando llega un nuevo registro
  useEffect(() => {
    if (dataCar) setCarList(prevCarList => [...prevCarList, dataCar]);
  }, [dataCar]);

  const table = useReactTable({
    data: carList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <>

      <Table>
        <TableHeaderCustom table={table} />
        <TableBodyCustom table={table} columns={columns} />
      </Table>

      <div className="pt-8">
        <PaginationTableCustom table={table} />
      </div>

    </>
  )
}
