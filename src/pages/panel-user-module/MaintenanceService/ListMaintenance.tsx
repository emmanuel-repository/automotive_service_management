import React, { useEffect, useMemo } from "react";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { useMaintenancesStore } from "@/core/stores/maintenance.store";
import { KeysTable } from "@/core/interfaces/keysTable.interface";
import { getColumns } from "@/lib/tables.configs";
import { useApi } from "@/hooks/useApi";
import { TableHeaderCustom } from "@/components/custom/TableHeaderCustom";
import { TableBodyCustom } from "@/components/custom/TableBodyCustom";
import { PaginationTableCustom } from "@/components/custom/PaginationTableCustom";
import { maintenanceService } from "@/core/services/maintenance.service";

interface ListCarsProps {
  slugMaintenance: string | undefined;
  actions: ActionsTable[];
}

export const ListMaintenance: React.FC<ListCarsProps> = ({ slugMaintenance, actions }) => {

  const { dataMaintenance, maintenanceList, addOrUpdateMaintenance, fetchMaintenance } = useMaintenancesStore();

  const { data: fetchedMaintenanceList, error } = useApi(() => slugMaintenance ?
    maintenanceService.getMaintenance(slugMaintenance) : Promise.resolve(null), { dependencies: [slugMaintenance] });

  const keysColumns = useMemo<KeysTable[]>(() => [
    { keyColumn: "description", description: "Descripcion" },
    { keyColumn: "status", description: "Estatus" },
    { keyColumn: "date", description: "Fecha" },
  ], []);

  const columns = useMemo(() => getColumns(keysColumns, actions), [actions, keysColumns]);

  // Si la API devuelve los datos, actualiza el estado de Zustand
  useEffect(() => {

    if (fetchedMaintenanceList && fetchedMaintenanceList.maintenance_services) {
      fetchMaintenance(fetchedMaintenanceList.maintenance_services); // Actualiza el estado con los datos obtenidos
    } else if (error) {
      fetchMaintenance([]); // En caso de error, asegúrate de pasar un arreglo vacío
    }

  }, [fetchedMaintenanceList, error, fetchMaintenance]);

  //Si se efectua algun cambio cuando se agregue o actualiza un registro.
  useEffect(() => {
    if (dataMaintenance.slug) addOrUpdateMaintenance(dataMaintenance);
  }, [dataMaintenance, addOrUpdateMaintenance]);

  //Configuracion de la tabla.
  const table = useReactTable({
    data: maintenanceList,
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
    </>
  )

}