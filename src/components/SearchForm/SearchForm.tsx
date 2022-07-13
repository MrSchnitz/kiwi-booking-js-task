import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Heading, Stack } from "@kiwicom/orbit-components";
import {
  destinationSearchPhraseSelector,
  ISearchFormData,
  locationsSelector,
  originSearchPhraseSelector,
  SearchFormAPI,
  searchFormDataSelector,
  SearchParam,
} from "./SearchFormAPI";
import { SearchFormWrapper } from "./SearchForm.styles";
import { City, FlightLocation } from "./SearchForm.types";
import SearchAutoCompleteInput from "../SearchAutoCompleteInput/SearchAutoCompleteInput";

interface IProps {
  onSearch?(searchParams: ISearchFormData): void;
}

const SearchForm = React.memo(({ onSearch }: IProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeInput, setActiveInput] = useState<null | SearchParam>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const originSearchPhrase: string = useSelector(originSearchPhraseSelector);
  const destinationSearchPhrase: string = useSelector(
    destinationSearchPhraseSelector
  );
  const locations: Array<FlightLocation> = useSelector(locationsSelector);
  const searchFormData: ISearchFormData = useSelector(searchFormDataSelector);

  const isSearchDisabled =
    Array.from(searchParams.values()).filter(Boolean).length !== 4;

  useEffect(() => {
    if (Array.from(searchParams.values()).filter(Boolean).length) {
      const searchData: ISearchFormData = {
        [SearchParam.ORIGIN]: "",
        [SearchParam.DESTINATION]: "",
        [SearchParam.DATE_FROM]: "",
        [SearchParam.DATE_TO]: "",
      };
      const searchDataKeys = Object.keys(searchData);

      for (const [k, v] of searchParams.entries()) {
        if (searchDataKeys.includes(k) && !!v) {
          searchData[k as SearchParam] = v;
        }
      }

      dispatch(SearchFormAPI.loadSearchFormData(searchData));
    }
  }, [dispatch, searchParams]);

  const onLocationInputChange = useCallback(
    (value: string, param: SearchParam): void => {
      setActiveInput(param);
      dispatch(
        param === SearchParam.ORIGIN
          ? SearchFormAPI.changeFromPhrase(value)
          : SearchFormAPI.changeToPhrase(value)
      );
    },
    [dispatch]
  );

  const onSelectLocation = useCallback(
    (city: City): void => {
      if (activeInput) {
        dispatch(SearchFormAPI.setLocations([]));
        dispatch(
          SearchFormAPI.setSearchFormData({
            ...searchFormData,
            [activeInput]: city.name,
          })
        );
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          [activeInput]: city.id,
        });
        setActiveInput(null);
      }
    },
    [dispatch]
  );

  const onSelectedCityButtonClick = useCallback((param: SearchParam): void => {
    const searchParamsCopy = Object.fromEntries(searchParams.entries());
    delete searchParamsCopy[param];
    setSearchParams(searchParamsCopy);
  }, []);

  const onSearchClick = (): void => {
    const searchParamsCopy = Object.fromEntries(searchParams.entries());
    const searchData: ISearchFormData = {
      [SearchParam.ORIGIN]: searchParamsCopy[SearchParam.ORIGIN],
      [SearchParam.DESTINATION]: searchParamsCopy[SearchParam.DESTINATION],
      [SearchParam.DATE_FROM]: searchParamsCopy[SearchParam.DATE_FROM],
      [SearchParam.DATE_TO]: searchParamsCopy[SearchParam.DATE_TO],
    };

    if (onSearch) {
      onSearch(searchData);
      return;
    }

    navigate({
      pathname: "search",
      search: `?${createSearchParams({ ...searchData })}`,
    });
  };

  return (
    <SearchFormWrapper>
      <Heading type={"title2"} spaceAfter="medium">
        Search for flights
      </Heading>
      <Stack
        flex={true}
        direction="column"
        justify="center"
        align="center"
        desktop={{ direction: "row" }}
      >
        <SearchAutoCompleteInput
          type={SearchParam.ORIGIN}
          activeInput={activeInput}
          locations={locations}
          searchFormData={searchFormData}
          value={originSearchPhrase}
          onLocationInputChange={onLocationInputChange}
          onSelectLocation={onSelectLocation}
          onSelectedCityButtonClick={onSelectedCityButtonClick}
        />
        <SearchAutoCompleteInput
          type={SearchParam.DESTINATION}
          activeInput={activeInput}
          locations={locations}
          searchFormData={searchFormData}
          value={destinationSearchPhrase}
          onLocationInputChange={onLocationInputChange}
          onSelectLocation={onSelectLocation}
          onSelectedCityButtonClick={onSelectedCityButtonClick}
        />
        <Button
          type="primary"
          disabled={isSearchDisabled}
          onClick={onSearchClick}
        >
          Search
        </Button>
      </Stack>
    </SearchFormWrapper>
  );
});

export default SearchForm;
