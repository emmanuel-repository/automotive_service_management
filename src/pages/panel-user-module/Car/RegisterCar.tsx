import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DangerAlert } from "@/components/custom/AlertCustom";
import { SubmitHandler, useForm } from "react-hook-form";
import { successAlert } from "@/pages/Swal";
import { Car } from "@/core/interfaces/car.interface";
import { carService } from "@/core/services/car.service";


interface RegisterCarProps {
  handleSubmitCallback: (data: Car) => void;
}

export const RegisterCar: React.FC<RegisterCarProps> = ({ handleSubmitCallback }) => {

  const [errorsFetch, setErrorsFetch] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm<Car>();

  const onSubmitForm: SubmitHandler<Car> = async (data: Car) => {

    const result = await carService.saveDataCar(data);
   
    if (result.errors) {
      setErrorsFetch(result.errors);
      return;
    }

    successAlert('Se guardaron los datos con Exito.')
    setErrorsFetch([]);
    handleSubmitCallback(result.car)
  };

  return (
    <>

      <div className="pt-10">
        {errorsFetch.length > 0 &&
          <DangerAlert errors={errorsFetch} />
        }
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)}>

        <div className="grid w-full items-center gap-4">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Numero de Placa</Label>
            <Input {...register("plate_number", { required: "Este campo es requerido" })} />
            {errors.plate_number && <small className="text-red-600">{errors.plate_number?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Modelo:</Label>
            <Input {...register("model", { required: "Este campo es requerido" })} />
            {errors.model && <small className="text-red-600">{errors.model?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Año:</Label>
            <Input type="number" {...register("year", { required: "Este campo es requerido" })} />
            {errors.year && <small className="text-red-600">{errors.year?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Button type="submit">Guardar</Button>
          </div>

        </div>

      </form>

    </>
  )

}