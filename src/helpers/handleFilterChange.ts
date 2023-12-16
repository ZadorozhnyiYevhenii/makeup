export const handleFilterChange = (
  value: string,
  selectedValues: string[],
  onChange: (values: string[]) => void,
  onFilterChange: (values: string[]) => void,
) => {
  const updatedValues = selectedValues.includes(value)
    ? selectedValues.filter((selectedValue) => selectedValue !== value)
    : [...selectedValues, value];

  onFilterChange(updatedValues);
  onChange(updatedValues);
}