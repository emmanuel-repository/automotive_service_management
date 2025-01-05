import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";


export function EditCar({ open, onClose, data, onChange, onSubmit }) {

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
            Editar datos de Auto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="text">Numero de Placa</Label>
              <Input name="plateNumber" value={localFormData.plate_number}
                onChange={handleChange}
                required />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="text">Modelo:</Label>
              <Input name="model" value={localFormData.model}
                onChange={handleChange}
                required />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="text">Año:</Label>
              <Input name="year" value={localFormData.year}
                onChange={handleChange}
                required />
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