import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";

export function MaintenanceEdit({ open, onClose, data, onChange, onSubmit }) {

  const [localFormData, setLocalFormData] = useState(data);

  useEffect(() => {
    setLocalFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...localFormData, [name]: value };

    setLocalFormData(updatedData);
    onChange(updatedData); // Notifica al componente padre
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (

    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>

        <DialogHeader >
          <DialogTitle>Editar datos</DialogTitle>
          <DialogDescription>
            Editar datos de registro de Servicio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="text">Descripcion</Label>
              <Input name="description" value={localFormData.description} onChange={handleChange} required />
            </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="text">Fecha:</Label>
              <Input type="date" name="date" value={localFormData.date} onChange={handleChange} required />
            </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="text">Estatus:</Label>
              <select name="status" value={localFormData.status} onChange={handleChange} required>
                <option value="">Seleccione una opción</option>
                <option value="“pending">“pending</option>
                <option value="in_progress">in_progress</option>
                <option value="completed">completed</option>
              </select>
            </div>

            <Button type="submit">
              Guardar
            </Button>
            
          </div>

        </form>

      </DialogContent>
    </Dialog>


  )

}

