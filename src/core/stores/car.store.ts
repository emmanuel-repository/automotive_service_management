
import { create } from 'zustand';
import { Car } from '../interfaces/car.interface';

interface CarStore {
  carList: Car[];
  dataCar: Car;
  fetchCars: (cars: Car[]) => void;
  addOrUpdateCar: (car: Car) => void;
  setDataCar: (car: Car) => void;
}

export const useCarStore = create<CarStore>((set) => ({
  carList: [],
  dataCar: { model: '', year: 0, plate_number: '' },

  // Cargar la lista de autos desde una fuente externa
  fetchCars: (cars) => set({ carList: cars }),

  // Agregar o actualizar un coche
  addOrUpdateCar: (car) =>
    set((state) => {
      // Verifica que carList exista antes de hacer el 'some'
      const exists = Array.isArray(state.carList) && state.carList.some((item: Car) => item.slug === car.slug);

      return {
        carList: exists
          ? state.carList.map((item) => item.slug === car.slug ? { ...item, ...car } : item)
          : [...state.carList, car],
      };
    }),

  setDataCar: (car) => set({ dataCar: car }),
}))