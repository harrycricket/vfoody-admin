import React, { useState } from 'react';
import Selector from '../common/Selector';
import { DateRangePicker } from '@nextui-org/react';
import { parseDate } from '@internationalized/date';

const DashboardTimeFilter = () => {
  const [selected, setSelected] = useState(3);
  const [isSpecificTimeFilter, setIsSpecificTimeFilter] = useState(true);
  const onChangeDashboardTimeFilterQuery = (id: number) => {
    let choice = parseInt(id.toString());
    let dateTo = new Date();
    let dateFrom = null;

    switch (choice) {
      case 1:
        setIsSpecificTimeFilter(true);
        break;
      case 2:
        setIsSpecificTimeFilter(true);
        dateFrom = new Date();
        dateFrom.setDate(dateTo.getDate() - 6);
        break;
      case 3:
        setIsSpecificTimeFilter(true);
        dateFrom = new Date();
        dateFrom.setDate(dateTo.getDate() - 29);
        break;
      case 4:
        setIsSpecificTimeFilter(true);
        dateFrom = new Date();
        dateFrom = new Date(dateTo.getFullYear(), 0, 1);
        break;
      case 5:
        setIsSpecificTimeFilter(true);
        let lastYear = dateTo.getFullYear() - 1;
        dateFrom = new Date();
        dateFrom = new Date(lastYear, 0, 1);
        dateTo = new Date(lastYear, 11, 31);
        break;
      default:
        setIsSpecificTimeFilter(false);
        console.log('Turned on period time filter.');
    }

    setSelected(choice);

    if (dateFrom == null) {
      // setDashboardTimeFilterQuery({ dateTo });
    } else {
      // setDashboardTimeFilterQuery({ dateFrom, dateTo });
    }
  };
  return (
    <div className="grid grid-cols-2 gap-1">
      <Selector
        width="180px"
        label="Filter by time"
        onSelect={(id) => onChangeDashboardTimeFilterQuery(parseInt(id.toString()))}
        selected={selected}
        options={[
          { key: 1, label: 'All of time' },
          { key: 2, label: 'Last 7 days' },
          { key: 3, label: 'Last 30 days' },
          { key: 4, label: 'This year' },
          { key: 5, label: 'Last year' },
          { key: 6, label: 'Specific period' },
        ]}
      />
      <DateRangePicker
        label="Duration"
        variant="bordered"
        isDisabled={isSpecificTimeFilter}
        defaultValue={{
          start: parseDate('2024-04-01'),
          end: parseDate('2024-04-08'),
        }}
        className="max-w-xs"
      />
    </div>
  );
};

export default DashboardTimeFilter;
