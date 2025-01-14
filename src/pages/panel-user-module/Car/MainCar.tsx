
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



export default function MainCar() {

  const [dataCar, setDataCar] = useState<Car>({ model: '', year: 0, plate_number: '' });
  const [dataCarEdit, setDataCarEdit] = useState<Car>({ model: '', year: 0, plate_number: '' });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [typeAction, setTypeAction] = useState<string>('');

  const saveData = (data: Car) => {
    setDataCar(data);
    setTypeAction('save');
  };

  const editData = (data: Car) => {
    setDataCar(data);
    setTypeAction('edit');
  }

  const closeDialog = (open = true) => {
    setOpenDialog(open); // Cerrar el diálogo}
  };

  const getData = useCallback((data: Car) => {
    setDataCarEdit(data)
    setOpenDialog(true);
  }, []);

  const deleteDate = useCallback(async (data: Car) => {

    const message: string = 'Se borrara el registro seleccionado, ¡No se podra revertir!'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    confirmationAlert(message).then(async (result: any) => {
      if (result.isConfirmed) {
       
        const result = await carService.deleteCar(data)

        if (result.errors) {
          infoAlert('¡Verifica!', 'No se pudo eliminar el registro.');
          return
        }

        setTypeAction('delete');

      }
    });

  }, []);

  const redirectPage = useCallback((data: Car) => {
    console.log('Actualizacion de los datos', data)
  }, [])

  const listActions = useMemo<ActionsTable[]>(() => [
    { description: 'Actualizar', callbacks: getData },
    { description: 'Eliminar', callbacks: deleteDate },
    { description: 'Mostrar Lista de Mantenimientos', callbacks: redirectPage }
  ], [deleteDate, getData, redirectPage]);

  return (
    <>
      <div className="flex flex-row">

        <div className="pt-10 flex-grow">
          <Card>

            <CardHeader>
              <div className="flex justify-center">
                <FaCarAlt className="size-40" />
              </div>
              <div>
                Servicios Automotriz
              </div>
            </CardHeader>

            <CardContent>

              <RegisterCar handleSubmitCallback={saveData} />

            </CardContent>

          </Card>
        </div>

        <div className="pt-10 ml-4 flex-grow">
          <Card className="w-auto">

            <CardHeader>
              Listado de Automoviles
            </CardHeader>

            <CardContent>

              <ListCars dataCar={dataCar} actions={listActions} typeAction={typeAction}/>

            </CardContent>

          </Card>
        </div>

      </div>

      <Dialog open={openDialog} onOpenChange={closeDialog} >
        <DialogContent>

          <DialogHeader >

            <DialogTitle>
              <div className="flex justify-center">
                <FaCarAlt className="size-40" />
              </div>
            </DialogTitle>

            <DialogDescription>
              <div className="flex justify-center text">
                Editar datos de Vehiculo
              </div>
            </DialogDescription>

          </DialogHeader>

          <EditCar dataCar={dataCarEdit} handleSubmitCallback={editData} handleCloseCallback={closeDialog} />

        </DialogContent>
      </Dialog>

    </>
  );

}
