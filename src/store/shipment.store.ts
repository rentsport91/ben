import { create } from "zustand";
import { ShipmentFormValues } from "./schema";

interface ShipmentStore {
  step: number;
  data: Partial<ShipmentFormValues>;
  setData: (values: Partial<ShipmentFormValues>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useShipmentStore = create<ShipmentStore>((set) => ({
  step: 1,
  data: {},
  setData: (values) => set((state) => ({ data: { ...state.data, ...values } })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  reset: () => set({ step: 1, data: {} }),
}));
