/* eslint-disable @typescript-eslint/no-explicit-any */
import { Maintenance } from "../interfaces/maintenance.interface";

export const maintenanceService = {

  async getMaintenance(slug: string) {

    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response: Response = await fetch(`${import.meta.env.VITE_API}/maintenance_service/${slug}`, {
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

  async saveMaintenance(data: Maintenance): Promise<any> {
    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response = await fetch(`${import.meta.env.VITE_API}/maintenance_service`, {
        method: 'POST',
        body: JSON.stringify(data), // Pasar FormData directamente
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

  async editMaintenance(data: Maintenance): Promise<any> {
    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response = await fetch(`${import.meta.env.VITE_API}/maintenance_service/${data.slug}`, {
        method: 'PUT',
        body: JSON.stringify(data), // Pasar FormData directamente
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

  async deleteMaintenance(data: Maintenance): Promise<any> {
    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response = await fetch(`${import.meta.env.VITE_API}/maintenance_service/${data.slug}`, {
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
