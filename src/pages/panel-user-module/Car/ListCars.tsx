import React, { useEffect, useMemo, useState } from "react";
import { getColumns } from "@/lib/tables.configs";
import { Table } from "@/components/ui/table";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { carService } from "@/core/services/car.service";
import { TableHeaderCustom } from "@/components/custom/TableHeaderCustom";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import { PaginationTableCustom } from "@/components/custom/PaginationTableCustom";
import { Car } from "@/core/interfaces/car.interface";
import { useApi } from "@/hooks/useApi";
import { KeysTable } from "@/core/interfaces/keysTable.interface";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";

interface ListCarsProps {
  dataCar: Car;
  actions: ActionsTable[]
}

export const ListCars: React.FC<ListCarsProps> = ({ dataCar, actions }) => {

  const [sorting] = useState([]);
  const [columnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [carList, setCarList] = useState<Car[]>([]);  // Añadir estado para los coches

  const { data: fetchedCarList } = useApi(carService.getCars);

  const keysColums: KeysTable[] = [
    { keyColumn: 'plate_number', description: 'Numero de Placa' },
    { keyColumn: 'model', description: 'Modelo' },
    { keyColumn: 'year', description: 'Año' },
  ];

  const columns = useMemo(() => getColumns(keysColums, actions), []);

  // Actualiza la lista de coches con los datos obtenidos del API
  useEffect(() => {
    if (fetchedCarList && fetchedCarList.cars) setCarList(fetchedCarList.cars);
  }, [fetchedCarList]);

  // Actualiza la lista de coches cuando llega un nuevo registro
  useEffect(() => {
    
    setCarList(prevCarList => {
      
      const updatedCarList = prevCarList.map(car => 
        car.slug === dataCar.slug ? { ...car, ...dataCar } : car
      );

      // Si el coche no existe, agrégalo
      if (!prevCarList.some(car => car.slug === dataCar.slug)) {
        return [...prevCarList, { ...dataCar, year: Number(dataCar.year) }];
      }

      return updatedCarList;

    });
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
