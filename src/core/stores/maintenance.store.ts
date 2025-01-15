import { create } from 'zustand';
import { Maintenance } from '../interfaces/maintenance.interface';

interface MaintenancesStore {
  maintenanceList: Maintenance[];
  dataMaintenance: Maintenance;
  fetchMaintenance: (services: Maintenance[]) => void;
  addOrUpdateMaintenance: (services: Maintenance) => void;
  setDataMaintenance: (service: Maintenance) => void;
}

export const useMaintenancesStore = create<MaintenancesStore>((set) => ({
  maintenanceList: [],
  dataMaintenance: { description: '', status: '', date: new Date('2025-01-15') },

  // Cargar la lista de autos desde una fuente externa
  fetchMaintenance: (services) => set({ maintenanceList: services }),

  // Agregar o actualizar un coche
  addOrUpdateMaintenance: (service) =>
    
    set((state) => {
      // Verifica si el mantenimiento ya existe en la lista
      const exists = state.maintenanceList.some((item: Maintenance) => item.slug === service.slug);

      return {
        // Actualiza el mantenimiento si existe, de lo contrario, agrega uno nuevo
        maintenanceList: exists ? state.maintenanceList.map((item) => item.slug === service.slug ? { ...item, ...service } : item) : [...state.maintenanceList, service],
      };
    }),


  setDataMaintenance: (service) => set({ dataMaintenance: service }),

}));
