
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ListCars from "./ListCars";
import RegisterCar from "./RegisterCar";
import { FaCarAlt } from "react-icons/fa";
import { useState } from "react";


export default function MainCar() {

  const [dataCar, setDataCar] = useState({});

  const handleSummit = (data: any) => {
    setDataCar(data.car);

  }

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

              <RegisterCar handleSubmitCallback={handleSummit} />

            </CardContent>

          </Card>
        </div>

        <div className="pt-10 ml-4 flex-grow">
          <Card className="w-auto">

            <CardHeader>
              Listado de Automoviles
            </CardHeader>

            <CardContent>

              <ListCars dataCar={dataCar}/>

            </CardContent>

          </Card>
        </div>

      </div>
    </>
  )

}

