import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DangerAlert } from "@/components/custom/AlertCustom";
import { useForm } from "react-hook-form";
import carService from "@/core/services/CarService";
import { successAlert } from "@/pages/Swal";


export default function RegisterCar({ handleSubmitCallback }) {

  const [errorsFetch, setErrorsFetch] = useState([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const onSubmitForm = async (data) => {

    const result = await carService.saveDataCar(data);

    if (result.errors) {
      setErrorsFetch(result.errors);
      return;
    }

    successAlert('Se guardaron los datos con Exito.')
    setErrorsFetch([]);
    handleSubmitCallback(result)
  };

  return (
    <>

      <div className="pt-10">
        {errorsFetch.length > 0 &&
         <DangerAlert errors={errorsFetch}/>
        }
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)}>

        <div className="grid w-full items-center gap-4">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Numero de Placa</Label>
            <Input {...register("plateNumber", { required: "Este campo es requerido" })} />
            {errors.plateNumber && <small className="text-red-600">{errors.plateNumber?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Modelo:</Label>
            <Input {...register("model", { required: "Este campo es requerido" })} />
            {errors.model && <small className="text-red-600">{errors.model?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Año:</Label>
            <Input   {...register("year", { required: "Este campo es requerido" })} />
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