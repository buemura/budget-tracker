import { MultiSelect } from "./MultiSelect";

export default function ExpenseFilter() {
  return (
    <div className="flex">
      <MultiSelect />
      <button className="bg-primary hover:bg-secondary text-white px-2 rounded-lg">
        Search
      </button>
    </div>
  );
}
