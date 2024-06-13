import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import PeriodTimeFilterQuery from '@/types/queries/PeriodTimeFilterQuery';

export interface PeriodTimeFilterQueryState {
  range: PeriodTimeFilterQuery;
  setRange: (value: PeriodTimeFilterQuery) => void;
  setDateFrom: (date: Date) => void;
  setDateTo: (date: Date) => void;
}

const usePeriodTimeFilterState = create<PeriodTimeFilterQueryState>((set) => ({
  range: { dateFrom: new Date(), dateTo: new Date() } as PeriodTimeFilterQuery,
  setRange: (value) => set(() => ({ range: value })),
  setDateFrom: (date) =>
    set((state) => ({
      range: { ...state.range, dateFrom: date },
    })),
  setDateTo: (date) =>
    set((state) => ({
      range: { ...state.range, dateTo: date },
    })),
}));

if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('PeriodTimeFilter State', usePeriodTimeFilterState); // mount to devtool in dev mode
export default usePeriodTimeFilterState;
