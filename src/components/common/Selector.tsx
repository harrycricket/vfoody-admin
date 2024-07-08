import { Select, SelectItem } from '@nextui-org/react';

interface OptionItem {
  key: number | string;
  label: string;
}
interface Props {
  label: string;
  selected: number | string;
  options: OptionItem[];
  onSelect: (id: number | string) => void;
  width: string;
}

const Selector = ({ label, selected, options, onSelect, width }: Props) => {
  return (
    <Select
      label={label}
      items={options}
      variant="bordered"
      placeholder="Chọn khoảng thời gian"
      selectedKeys={[selected]}
      className={`w-[${width}]`}
      onChange={(event) => {
        if (event.target) onSelect(parseInt(event.target.value) || event.target.value);
      }}
    >
      {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
    </Select>
  );
};

export default Selector;
