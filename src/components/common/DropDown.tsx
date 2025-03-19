interface Option {
  value: string | boolean;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onChange: (value: string) => void;
  selectedValue: string | boolean;
  title: string;
}

export const DropDown = ({
  options,
  onChange,
  selectedValue,
  title,
}: DropdownProps) => {
  return (
    <div>
      <p>{title} </p>
      <select
        value={selectedValue.toString()}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value=""> Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value.toString()} value={option.value.toString()}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
