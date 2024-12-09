import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAddressAutocomplete } from "./useAutoCompleteAddress";

export const AutoCompleteAddress: React.FC = () => {
  const {
    addressSuggestions,
    inputValue,
    value,
    handleInputChange,
    handleSelection,
    isDisabled,
  } = useAddressAutocomplete();

  return (
    <Autocomplete
      id="autocomplete"
      autoHighlight
      disabled={isDisabled}
      options={addressSuggestions}
      value={value}
      onChange={handleSelection}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label="New delivery point" />
      )}
      className="w-full"
    />
  );
};
