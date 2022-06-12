export interface IAutoCompleteSelectProps {
  list: { label: string; value: string }[];
  handleChange: (data: any) => void;
}

export default function AutoCompleteSelect(props: IAutoCompleteSelectProps) {
  const { list, handleChange } = props;
  const onChange = (e: any) => {
    const value = e.target[e.target.selectedIndex].getAttribute("value");
    handleChange(value);
  };
  return (
    <div>
      <select className="form-select shadow-none w-full" onChange={onChange}>
        {list.map((data) => (
          <option key={data.label} value={data.value}>
            {data.label}
          </option>
        ))}
      </select>
    </div>
  );
}
