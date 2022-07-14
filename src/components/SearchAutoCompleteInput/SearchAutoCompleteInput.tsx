import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  InputField,
  Tile,
  TileGroup,
} from "@kiwicom/orbit-components";
import { ISearchFormData, SearchParam } from "../SearchForm/SearchFormAPI";
import { SearchFormPopoverContentWrapper } from "../SearchForm/SearchForm.styles";
import { CloseCircle } from "@kiwicom/orbit-components/icons";
import { useSearchParams } from "react-router-dom";
import { City, FlightLocation } from "../../types/FlightLocationTypes";
import {
  AutoCompletePopover,
  AutoCompleteWrapper,
} from "./SearchAutoCompleteInput.styles";

interface IProps {
  activeInput: null | SearchParam;
  locations: Array<FlightLocation>;
  searchFormData: ISearchFormData;
  type: SearchParam.ORIGIN | SearchParam.DESTINATION;
  value: string;
  onLocationInputChange(value: string, param: SearchParam): void;
  onSelectLocation(city: City): void;
  onSelectedCityButtonClick(param: SearchParam): void;
}

const SearchAutoCompleteInput = React.memo(
  ({
    activeInput,
    locations,
    searchFormData,
    type,
    value,
    onLocationInputChange,
    onSelectLocation,
    onSelectedCityButtonClick,
  }: IProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isPopoverOpened, setPopoverOpen] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
      setPopoverOpen(activeInput === type && !!locations.length);
    }, [activeInput, locations.length, type]);

    useEffect(() => {
      document.addEventListener("click", handleDocumentOnClick);

      return () => document.removeEventListener("click", handleDocumentOnClick);
    }, []);

    return (
      <AutoCompleteWrapper ref={wrapperRef}>
        {searchParams.get(type) && searchFormData[type] ? (
          <Button
            type="primary"
            width="100%"
            iconRight={<CloseCircle color="tertiary" />}
            onClick={() => onSelectedCityButtonClick(type)}
          >
            {searchFormData[type]}
          </Button>
        ) : (
          <InputField
            prefix={type === SearchParam.ORIGIN ? "From" : "To"}
            onChange={onInputChange}
            value={value}
            onFocus={onInputFocus}
            onKeyDown={onInputKeyDown}
          />
        )}
        {isPopoverOpened && (
          <AutoCompletePopover>
            <SearchFormPopoverContentWrapper>
              <TileGroup>
                {locations.map((location) => (
                  <Tile
                    key={location.id}
                    onClick={() => onSelectLocation(location.city)}
                  >
                    {location.name}
                  </Tile>
                ))}
              </TileGroup>
            </SearchFormPopoverContentWrapper>
          </AutoCompletePopover>
        )}
      </AutoCompleteWrapper>
    );

    function handleDocumentOnClick(event: MouseEvent): void {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setPopoverOpen((prevState) => (prevState ? false : prevState));
      }
    }

    function onInputChange(event: SyntheticEvent<HTMLInputElement>): void {
      onLocationInputChange(
        (event as ChangeEvent<HTMLInputElement>).target.value,
        type
      );
    }

    function onInputFocus(): void {
      if (!!value.length) {
        onLocationInputChange(value, type);
        setPopoverOpen(true);
      }
    }

    function onInputKeyDown(event: React.KeyboardEvent | undefined): void {
      if (event?.code === "Escape") {
        setPopoverOpen(false);
      }
    }
  }
);

export default SearchAutoCompleteInput;
