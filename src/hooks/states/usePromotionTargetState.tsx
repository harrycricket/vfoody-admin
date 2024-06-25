import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import PromotionModel from '@/types/models/PromotionModel';
interface PromotionState {
  id: number;
  model: PromotionModel;
  setId: (id: number) => void;
  setModel: (model: PromotionModel) => void;
}

const usePromotionTargetState = create<PromotionState>((set) => ({
  id: 0,
  model: {} as PromotionModel,
  setId: (id: number) => set((state) => ({ ...state, id })),
  setModel: (model: PromotionModel) => set((state) => ({ ...state, model })),
}));

if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('Counter State', usePromotionTargetState); // mount to devtool in dev mode

export default usePromotionTargetState;
