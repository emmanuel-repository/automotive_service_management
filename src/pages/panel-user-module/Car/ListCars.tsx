import React, { useEffect, useMemo } from "react";
import { getColumns } from "@/lib/tables.configs";
import { Table } from "@/components/ui/table";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { carService } from "@/core/services/car.service";
import { TableHeaderCustom } from "@/components/custom/TableHeaderCustom";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import { PaginationTableCustom } from "@/components/custom/PaginationTableCustom";
import { KeysTable } from "@/core/interfaces/keysTable.interface";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { useCarStore } from "@/core/stores/car.store";
import { useApi } from "@/hooks/useApi";

interface ListCarsProps {
  actions: ActionsTable[];
}

export const ListCars: React.FC<ListCarsProps> = ({ actions }) => {

  const { carList, dataCar, fetchCars, addOrUpdateCar } = useCarStore();
  const { data: fetchedCarList, error } = useApi(carService.getCars);

  const keysColumns = useMemo<KeysTable[]>(() => [
    { keyColumn: "plate_number", description: "Numero de Placa" },
    { keyColumn: "model", description: "Modelo" },
    { keyColumn: "year", description: "Año" },
  ], []);

  const columns = useMemo(() => getColumns(keysColumns, actions), [actions, keysColumns]);

  // Si la API devuelve los datos, actualiza el estado de Zustand
  useEffect(() => {
    
    if (fetchedCarList && fetchedCarList.cars) {
      fetchCars(fetchedCarList.cars); // Actualiza el estado con los datos obtenidos
    } else if (error) {
      fetchCars([]); // En caso de error, asegúrate de pasar un arreglo vacío
    }

  }, [fetchedCarList, error, fetchCars]);

  useEffect(() => {
    if (dataCar.slug) addOrUpdateCar(dataCar);
  }, [dataCar, addOrUpdateCar]);

  const table = useReactTable({
    data: carList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      {/* <pre>{JSON.stringify(carList, null, 2)}</pre> */}
    </>
  );

}
