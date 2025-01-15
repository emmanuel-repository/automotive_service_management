
import { create } from 'zustand';

interface Car {
  model: string;
  year: number;
  plate_number: string;
  slug?: string;
}

interface CarStore {
  carList: Car[];
  dataCar: Car;
  fetchCars: (cars: Car[]) => void;
  addOrUpdateCar: (car: Car) => void;
}

 export const useCarStore = create<CarStore>((set) => ({
  carList: [],
  dataCar: { model: '', year: 0, plate_number: '' },

  // Cargar la lista de autos desde una fuente externa
  fetchCars: (cars) => set({ carList: cars }),

  // Agregar o actualizar un coche
  addOrUpdateCar: (car) => set((state) => {

    const exists = state.carList.some((item: Car) => item.slug === car.slug);

    if (exists) {
      return {
        carList: state.carList.map((item: Car) => (item.slug === car.slug ? { ...item, ...car } : item)),
      };
    }

    return { carList: [...state.carList, car] };

  }),


}))