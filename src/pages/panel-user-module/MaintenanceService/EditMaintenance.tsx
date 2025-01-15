import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMaintenancesStore } from "@/core/stores/maintenance.store";
import { Maintenance } from "@/core/interfaces/maintenance.interface";
import { DangerAlert } from "@/components/custom/AlertCustom";
import { maintenanceService } from "@/core/services/maintenance.service";
import { infoAlert, successAlert } from "@/pages/Swal";

interface EditMaintenanceProps {
  handleCloseCallback: (open: boolean) => void;
}


export const EditMaintenance: React.FC<EditMaintenanceProps> = ({ handleCloseCallback }) => {

  const [errorsFetch, setErrorsFetch] = useState([]);
  const { dataMaintenance, addOrUpdateMaintenance } = useMaintenancesStore();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Maintenance>({
    defaultValues: {
      description: dataMaintenance.description,
      date: new Date(dataMaintenance.date).toISOString().split('T')[0],
      slug: dataMaintenance.slug,
      status: dataMaintenance.status
    }
  });

  // Si dataCar cambia, puedes setear los valores manualmente
  useEffect(() => {
    setValue('description', dataMaintenance.description);
    setValue('date', new Date(dataMaintenance.date).toISOString().split('T')[0]);
    setValue('status', dataMaintenance.status);
  }, [dataMaintenance, setValue]);

  const onSubmit: SubmitHandler<Maintenance> = async (data: Maintenance) => {

    const result = await maintenanceService.editMaintenance(data);

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
    addOrUpdateMaintenance(result.maintenance_service)
  }

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

            {errors.status && <small className="text-red-600">{errors.status?.message}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Button type="submit">Guardar</Button>
          </div>

        </div>

      </form>
    </>
  )

}

