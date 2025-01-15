import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMaintenancesStore } from "@/core/stores/maintenance.store";
import { Maintenance } from "@/core/interfaces/maintenance.interface";
import { maintenanceService } from "@/core/services/maintenance.service";
import { infoAlert, successAlert } from "@/pages/Swal";
import { DangerAlert } from "@/components/custom/AlertCustom";

interface RegisterMaintenanceProps {
  slugCar: string | undefined
}

export const RegisterMaintenance: React.FC<RegisterMaintenanceProps> = ({ slugCar }) => {

  const { addOrUpdateMaintenance } = useMaintenancesStore()
  const [errorsFetch, setErrorsFetch] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm<Maintenance>();

  const onSubmitForm: SubmitHandler<Maintenance> = async (data: Maintenance) => {

    data['slugCar'] = slugCar;

    const result = await maintenanceService.saveMaintenance(data);

    if (result.error) {
      infoAlert('Error', result.error);
      return;
    }

    if (result.errors) {
      setErrorsFetch(result.errors);
      return;
    }

    successAlert('Se guardaron los datos con Exito.');
    setErrorsFetch([]);
    addOrUpdateMaintenance(result.maintenance_service);
  };

  return (
    <>

      {errorsFetch.length > 0 &&
        <div className="pt-10">
          <DangerAlert errors={errorsFetch} />
        </div>
      }

      <form onSubmit={handleSubmit(onSubmitForm)}>

        <div className="grid w-full items-center gap-4">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Descripcion</Label>
            <Input  {...register("description", { required: "Este campo es requerido" })} />

            {errors.description && <small className="text-red-600">{errors.description?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Fecha:</Label>
            <Input type="date"  {...register("date", { required: "Este campo es requerido" })} />

            {errors.date && <small className="text-red-600">{errors.date?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="text">Estatus:</Label>
            <select {...register("status", { required: "Este campo es requerido" })}>
              <option value="">Seleccione una opción</option>
              <option value="“pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="completed">completed</option>
            </select>

            {errors.date && <small className="text-red-600">{errors.date?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5 pt-3">
            <Button type="submit">Guardar</Button>
          </div>

        </div>

      </form>
    </>
  )

}