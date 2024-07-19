import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import WithdrawModel, { initWithdrawSampleObject } from '@/types/models/WithdrawModel';

interface WithdrawState {
  id: number;
  model: WithdrawModel;
  setId: (id: number) => void;
  setModel: (model: WithdrawModel) => void;
}

const useWithdrawTargetState = create<WithdrawState>((set) => ({
  id: 0,
  model: { ...initWithdrawSampleObject },
  setId: (id: number) => set((state) => ({ ...state, id })),
  setModel: (model: WithdrawModel) => set((state) => ({ ...state, model })),
}));

if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('Withdraw State', useWithdrawTargetState); // mount to devtool in dev mode

export default useWithdrawTargetState;
