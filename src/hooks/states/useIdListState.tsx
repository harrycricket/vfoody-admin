import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
interface IdListState {
  shopId: number;
  setShopId: (id: number) => void;
}

const useIdListState = create<IdListState>((set) => ({
  shopId: 0,
  setShopId: (id) => set((state) => ({ ...state, shopId: id })),
}));

if (process.env.NODE_ENV === 'development') mountStoreDevtool('Counter State', useIdListState); // mount to devtool in dev mode

export default useIdListState;
