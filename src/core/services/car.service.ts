/* eslint-disable @typescript-eslint/no-explicit-any */
import { Car } from "../interfaces/car.interface";

export const carService = {

  async getCars(): Promise<any> {

    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response: Response = await fetch(`${import.meta.env.VITE_API}/car`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": dataSession.token
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to fetch car: ${JSON.stringify(data)}`);
      }

      return data

    } catch (error) {

      console.log(error)
      return []
    }
  },

  async saveDataCar(data: Car): Promise<any> {
    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response = await fetch(`${import.meta.env.VITE_API}/car`, {
        method: 'POST',
        body: JSON.stringify(data), // Pasar FormData directamente
        headers: {
          "Content-Type": "application/json",
          "Authorization": dataSession.token
        },
      });

      const result: unknown = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(result)); // Guardamos los errores en el mensaje del error
      }

      return result

    } catch (error) {

      if (error instanceof Error) {
        throw new Error(error.message); // Reenviamos el error
      }
      throw new Error("Error desconocido");
    }
  },

  async editDataCar(data: Car): Promise<any> {
    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response = await fetch(`${import.meta.env.VITE_API}/car/${data.slug}`, {
        method: 'PUT',
        body: JSON.stringify(data), // Pasar FormData directamente
        headers: {
          "Content-Type": "application/json",
          "Authorization": dataSession.token
        },
      });

      const result: any = await response.json();

      return result

    } catch (error) {

      console.log('estado de peticion', error)

      return error;
    }
  },

  async deleteCar(data: Car): Promise<any> {
    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response = await fetch(`${import.meta.env.VITE_API}/car/${data.slug}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": dataSession.token
        },
      });

      const result: unknown = await response.json();

      return result

    } catch (error) {

      return error;
    }
  },

}

