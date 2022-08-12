export interface IAutoCompleteSelectProps {
  list: { label: string; value: string }[];
  handleChange: (data: any) => void;
  data: string;
}

export default function CustomAutoCompleteSelect(
  props: IAutoCompleteSelectProps
) {
  const { list, handleChange, data } = props;
  const onChange = (e: any) => {
    const value = e.target[e.target.selectedIndex].getAttribute("value");
    handleChange(value);
  };

  return (
    <div>
      <select
        className="form-select shadow w-full "
        onChange={onChange}
        value={data}
      >
        {list.map((data) => (
          <option key={data.label} value={data.value}>
            {data.label}
          </option>
        ))}
      </select>
    </div>
  );
}
