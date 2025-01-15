import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { FaCarAlt } from "react-icons/fa";
import { Maintenance } from "@/core/interfaces/maintenance.interface";
import { useMaintenancesStore } from "@/core/stores/maintenance.store";
import { confirmationAlert, infoAlert } from "@/pages/Swal";
import { maintenanceService } from "@/core/services/maintenance.service";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { ListMaintenance } from "./ListMaintenance";
import { RegisterMaintenance } from "./RegisterMaintenance";
import { EditMaintenance } from "./EditMaintenance";


export default function MainService() {

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { setDataMaintenance, maintenanceList, fetchMaintenance } = useMaintenancesStore();
  const { id } = useParams();

  // Manejar cierre del diálogo
  const closeDialog = useCallback((open = true) => {
    setOpenDialog(open);
  }, []);

  //Manejador para abrir el modal para actualizar los datos de 
  const handleUpdate = useCallback((data: Maintenance) => {
    setDataMaintenance(data); // Actualizar en el estado global
    setOpenDialog(true); // Abrir el diálogo para edición
  }, [setDataMaintenance]);

  const handleDelete = useCallback(async (data: Maintenance) => {

    const message = "Se borrará el registro seleccionado, ¡No se podrá revertir!";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    confirmationAlert(message).then(async (result: any) => {
      if (result.isConfirmed) {

        const result = await maintenanceService.deleteMaintenance(data)

        if (result.errors) {
          infoAlert("¡Verifica!", "No se pudo eliminar el registro.");
        } else {
          // Eliminar del estado global
          fetchMaintenance(maintenanceList.filter((service: Maintenance) => service.slug !== data.slug));
        }

      }
    });
  }, [maintenanceList, fetchMaintenance]);

  const listActions = useMemo<ActionsTable[]>(
    () => [
      { description: "Actualizar", callbacks: handleUpdate },
      { description: "Eliminar", callbacks: handleDelete },
    ],
    [handleUpdate, handleDelete]
  );

  return (
    <>
      <div className="flex flex-row">

        <div className="pt-10 flex-grow">
          <Card>

            <CardHeader>
              <div className="flex justify-center">
                <FaCarAlt className="size-40" />
              </div>
              <div>Servicios Automotriz</div>
            </CardHeader>

            <CardContent>
              {/* Registro de cochesç */}
              <RegisterMaintenance slugCar={id}/>
            </CardContent>

          </Card>
        </div>

        <div className="pt-10 ml-4 flex-grow">
          <Card className="w-auto">
            <CardHeader>Listado de Mantenimientos.</CardHeader>

            <CardContent>
              {/* Tabla con listado de Mantenimientos*/}
              <ListMaintenance actions={listActions} slugMaintenance={id} />
            </CardContent>

          </Card>
        </div>

      </div>

      {/* Diálogo para editar los datos de mantenimientos. */}
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>

          <DialogHeader>

            <DialogTitle>
              <div className="flex justify-center">
                <FaCarAlt className="size-40" />
              </div>
            </DialogTitle>

            <DialogDescription className="flex justify-center text-xl">
              Editar datos de Vehículo
            </DialogDescription>
          </DialogHeader>

          <EditMaintenance handleCloseCallback={closeDialog}/>

        </DialogContent>
      </Dialog>
    </>
  )
}
