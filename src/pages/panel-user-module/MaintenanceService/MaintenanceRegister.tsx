import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaCarAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function MaintenanceRegister({ handleSubmitCallback }) {

  const [formData, setFormData] = useState({ description: "", status: "", date: "", });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitCallback(formData); // Envía los datos al componente padre
    // setFormData({ plateNumber: "", model: "", year: "" }); // Limpia el formularioç
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="w-[400px]">

          <CardHeader>

            <CardTitle>
              <div className="flex justify-center">
                <FaCarAlt className="size-40" />
              </div>
              <div>
                Servicios Automotriz
              </div>
            </CardTitle>

            <CardDescription>
              Alta de Mantenimiento
            </CardDescription>

          </CardHeader>

          <CardContent>

            <div className="grid w-full items-center gap-4">

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text">Descripcion</Label>
                <Input name="description" value={formData.description} onChange={handleChange} required />
              </div>


              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text">Fecha:</Label>
                <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>


              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text">Estatus:</Label>
                <select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="">Seleccione una opción</option>
                  <option value="“pending">pending</option>
                  <option value="in_progress">in_progress</option>
                  <option value="completed">completed</option>
                </select>
              </div>


            </div>

          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit">Guardar</Button>
          </CardFooter>
        </Card>

      </form>
    </>
  )

}