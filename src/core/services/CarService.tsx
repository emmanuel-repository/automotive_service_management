const carService = {

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

  async saveDataCar(data: any): Promise<any> {
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

      const result: any = await response.json();

      return result

    } catch (error) {

      return error;
    }
  },

  async editDataCar(data: any): Promise<any> {
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

      return error;
    }
  },

  async deleteCar(slug: string): Promise<any> {
    try {
      const dataSession = JSON.parse(localStorage.getItem('sessionData') ?? '{}');
      const response = await fetch(`${import.meta.env.VITE_API}/car/${slug}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": dataSession.token
        },
      });

      const result: any = await response.json();

      return result

    } catch (error) {

      return error;
    }
  },
}

export default carService;