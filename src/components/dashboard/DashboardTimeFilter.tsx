'use client';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';
import Selector from '../common/Selector';
import { CalendarDate, DateValue, RangeValue } from '@nextui-org/react';
import { parseDate } from '@internationalized/date';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';

const DateRangePicker = dynamic(
  () => import('@nextui-org/react').then((mod) => mod.DateRangePicker),
  {
    ssr: false,
  },
);

const dateToDateValue = (date: Date): CalendarDate => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return parseDate(`${year}-${month}-${day}`);
};

const getDateMinusDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - days);
  return newDate;
};

const getThisYear = () => new Date().getFullYear();

const DashboardTimeFilter = () => {
  const [selected, setSelected] = useState(3);
  const [isSpecificTimeFilter, setIsSpecificTimeFilter] = useState(true);
  // Calculate initial range values
  const { range, setRange, setDateFrom, setDateTo } = usePeriodTimeFilterState();
  const isFirstRender = useRef(true);
  if (isFirstRender.current) {
    isFirstRender.current = false;
    setRange({
      dateFrom: getDateMinusDays(new Date(), 29),
      dateTo: new Date(),
    });
  }

  //event handling
  const onChangeDashboardTimeFilterQuery = (id: number) => {
    let choice = parseInt(id.toString());

    switch (choice) {
      case 1:
        setIsSpecificTimeFilter(true);
        setRange({
          dateFrom: new Date(2024, 0, 1),
          dateTo: new Date(),
        });
        break;
      case 2:
        setIsSpecificTimeFilter(true);
        setRange({
          dateFrom: getDateMinusDays(new Date(), 6),
          dateTo: new Date(),
        });
        break;
      case 3:
        setIsSpecificTimeFilter(true);
        setRange({
          dateFrom: getDateMinusDays(new Date(), 29),
          dateTo: new Date(),
        });
        break;
      case 4:
        setIsSpecificTimeFilter(true);
        setRange({
          dateFrom: new Date(getThisYear(), 0, 1),
          dateTo: new Date(),
        });
        break;
      case 5:
        setIsSpecificTimeFilter(true);
        setRange({
          dateFrom: new Date(getThisYear() - 1, 0, 1),
          dateTo: new Date(getThisYear() - 1, 11, 31),
        });
        break;
      default:
        setIsSpecificTimeFilter(false);
        console.log('Turned on period time filter.');
    }

    setSelected(choice);
  };

  const onDateRangePickerChange = (range: RangeValue<DateValue>) => {
    if (range.start) {
      setDateFrom(new Date(range.start.toString()));
    }
    if (range.end) {
      setDateTo(new Date(range.end.toString()));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-1">
      <Selector
        width="180px"
        label="Lọc theo thời gian"
        onSelect={(id) => onChangeDashboardTimeFilterQuery(parseInt(id.toString()))}
        selected={selected}
        options={[
          { key: 1, label: 'Tất cả' },
          { key: 2, label: '7 ngày gần nhất' },
          { key: 3, label: '30 ngày gần nhất' },
          { key: 4, label: 'Trong năm này' },
          { key: 5, label: 'Trong năm trước' },
          { key: 6, label: 'Tự chọn' },
        ]}
      />
      <DateRangePicker
        label="Chọn ngày"
        variant="bordered"
        isDisabled={isSpecificTimeFilter}
        value={{
          start: dateToDateValue(range.dateFrom),
          end: dateToDateValue(range.dateTo),
        }}
        onChange={onDateRangePickerChange}
        className="max-w-xs"
      />
    </div>
  );
};

export default DashboardTimeFilter;
