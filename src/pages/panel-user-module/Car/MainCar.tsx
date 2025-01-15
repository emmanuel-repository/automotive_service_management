/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { FaCarAlt } from "react-icons/fa";
import { ListCars } from "./ListCars";
import { RegisterCar } from "./RegisterCar";
import { Car } from "@/core/interfaces/car.interface";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";
import { EditCar } from "./EditCar";
import { confirmationAlert, infoAlert } from "@/pages/Swal";
import { carService } from "@/core/services/car.service";
import { useCarStore } from "@/core/stores/car.store";

export default function MainCar() {

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { setDataCar, carList, fetchCars } = useCarStore();

  // Manejar cierre del diálogo
  const closeDialog = useCallback((open = true) => {
    setOpenDialog(open);
  }, []);

  //Manejador para abrir el modal para actualizar los datos de 
  const handleUpdate = useCallback((data: Car) => {
    setDataCar(data); // Actualizar en el estado global
    setOpenDialog(true); // Abrir el diálogo para edición
  }, [setDataCar]);

  const handleDelete = useCallback(async (data: Car) => {

    const message = "Se borrará el registro seleccionado, ¡No se podrá revertir!";

    confirmationAlert(message).then(async (result: any) => {
      if (result.isConfirmed) {

        const result = await carService.deleteCar(data);

        if (result.errors) {
          infoAlert("¡Verifica!", "No se pudo eliminar el registro.");
        } else {
          // Eliminar del estado global
          fetchCars(carList.filter((car: Car) => car.slug !== data.slug));
        }

      }
    });
  }, [carList, fetchCars]);

  const handleMaintenance = useCallback((data: Car) => {
    console.log("Redirigiendo a mantenimientos para:", data);
  }, []);

  const listActions = useMemo<ActionsTable[]>(
    () => [
      { description: "Actualizar", callbacks: handleUpdate },
      { description: "Eliminar", callbacks: handleDelete },
      { description: "Mantenimientos", callbacks: handleMaintenance },
    ],
    [handleUpdate, handleDelete, handleMaintenance]
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
              <RegisterCar />
            </CardContent>

          </Card>
        </div>

        <div className="pt-10 ml-4 flex-grow">
          <Card className="w-auto">
            <CardHeader>Listado de Automóviles</CardHeader>

            <CardContent>
              {/* Tabla con listado de coches */}
              <ListCars actions={listActions} />
            </CardContent>

          </Card>
        </div>

      </div>

      {/* Diálogo para editar coches */}
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

          <EditCar handleCloseCallback={closeDialog} />

        </DialogContent>
      </Dialog>
    </>
  );

}
