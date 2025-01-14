
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ListCars } from "./ListCars";
import { RegisterCar } from "./RegisterCar";
import { FaCarAlt } from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import { Car } from "@/core/interfaces/car.interface";
import { ActionsTable } from "@/core/interfaces/actionsTable.interface";


export default function MainCar() {

  const [dataCar, setDataCar] = useState<Car>({ model: '', year: 0, plate_number: '' });

  const saveData = (data: Car) => {
    setDataCar(data);
  };

  const getData = useCallback((data: Car) => {
    console.log('Fetching data...', data);
  }, []);
  
  const deleteDate = useCallback((data: Car) => {
    console.log(`Deleting data for ID: ${data}`);
  }, []);
  
  const listActions = useMemo<ActionsTable[]>(() => [
    { description: 'Actualizar', callbacks: getData },
    { description: 'Eliminar', callbacks: deleteDate },
  ], [deleteDate, getData]);

  console.log('listActions:', listActions);

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

              <ListCars dataCar={dataCar} actions={listActions}/>

            </CardContent>

          </Card>
        </div>

      </div>
    </>
  );

}
