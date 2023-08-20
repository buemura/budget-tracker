import Select from "react-select";

const options = [
  { value: true, label: "Paid" },
  { value: false, label: "Not Paid" },
];

export function MultiSelect() {
  return (
    <Select
      defaultValue={[options[0], options[1]]}
      isMulti
      name="Status"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
