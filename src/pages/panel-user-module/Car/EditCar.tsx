import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car } from "@/core/interfaces/car.interface";
import { DangerAlert } from "@/components/custom/AlertCustom";
import { carService } from "@/core/services/car.service";
import { infoAlert, successAlert } from "@/pages/Swal";
import { useCarStore } from "@/core/stores/car.store";

interface EditCarProps {
  handleCloseCallback: (open: boolean) => void;
}

export const EditCar: React.FC<EditCarProps> = ({ handleCloseCallback }) => {

  const [errorsFetch, setErrorsFetch] = useState([]);
  const { dataCar, addOrUpdateCar, } = useCarStore();

  // Si dataCar contiene estos valores
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Car>({
    defaultValues: {
      plate_number: dataCar.plate_number,
      model: dataCar.model,
      year: dataCar.year,
      slug: dataCar.slug
    },
  });

  // Si dataCar cambia, puedes setear los valores manualmente
  useEffect(() => {
    setValue('plate_number', dataCar.plate_number);
    setValue('model', dataCar.model);
    setValue('year', dataCar.year);
  }, [dataCar, setValue]);

  const onSubmit = async (data: Car) => {
    const result = await carService.editDataCar(data);

    if (result.error) {
      infoAlert('Error', result.error,);
      handleCloseCallback(false);
      return;
    }

    if (result.errors) {
      setErrorsFetch(result.errors);
      return;
    }

    handleCloseCallback(false);
    successAlert('Se actualizaron los datos con Exito.');
    setErrorsFetch([]);
    addOrUpdateCar(result.car);
  };

  return (
    <>

      {errorsFetch.length > 0 &&
        <div className="pt-10">
          <DangerAlert errors={errorsFetch} />
        </div>
      }

      <form onSubmit={handleSubmit(onSubmit)}>
        
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

          <Button type="submit">
            Guardar
          </Button>

        </div>

      </form>
    </>
  );

}