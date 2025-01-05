import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaCarAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegisterCar({ handleSubmitCallback }) {

  const [formData, setFormData] = useState({ plateNumber: "", model: "", year: "", });

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
              Gestion de Servicios Automotrices.
            </CardDescription>

          </CardHeader>

          <CardContent>

            <div className="grid w-full items-center gap-4">

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text">Numero de Placa</Label>
                <Input name="plateNumber" value={formData.plateNumber} onChange={handleChange} required />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text">Modelo:</Label>
                <Input name="model" value={formData.model} onChange={handleChange} required />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="text">Año:</Label>
                <Input name="year" value={formData.year} onChange={handleChange} required />
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