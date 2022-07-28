import { ChangeEvent, useState } from "react";
import AutoCompleteForm from "../AutoComplete/AutoCompleteForm";

export function SearchForm(props: any) {
  const [originValue, setOriginValue] = useState("");
  const [destinationValue, setDestinationValue] = useState("");
  const [departureValue, setDepartureValue] = useState("");

  const handleChangeDepartureDate = (event: ChangeEvent<any>) => {
    setDepartureValue(event.target.value);
  };

  const handleSearch = () => {
    props.onSearch({
      origin: originValue,
      destination: destinationValue,
      departure: departureValue,
    });
  };

  const handleSelectOrigin = (item) => {
    setOriginValue(item);
  };

  const handleSelectDestination = (item) => {
    setDestinationValue(item);
  };

  return (
    <div>
      {originValue ? (
        <div>{originValue}</div>
      ) : (
        <AutoCompleteForm onSelect={handleSelectOrigin} />
      )}
      <AutoCompleteForm onSelect={handleSelectDestination} />
      <input
        type="date"
        onChange={handleChangeDepartureDate}
        value={departureValue}
      />
      <button onClick={handleSearch} disabled={props.isDisabled}>
        Search
      </button>
    </div>
  );
}
