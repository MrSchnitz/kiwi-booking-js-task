import SearchPageApiSingleton, {
  ISearchPageApi,
  SearchPageAPI,
  SearchPageApiName,
  SearchPageApiReducer,
  SearchPageApiSaga,
} from "../SearchPageAPI";
import { SearchParam } from "../../../components/SearchForm/SearchFormAPI";
import { FlightSearchResult } from "../../../types/FlightSearchResultTypes";
import { SearchParams } from "../SearchPage";
import { takeEvery } from "redux-saga/effects";

const MOCK_FLIGHT_RESULTS: Array<Partial<FlightSearchResult>> = [
  { cityFrom: "Praha", cityTo: "Berlin" },
  { cityFrom: "Bern", cityTo: "London" },
];

const MOCK_SEARCH_PARAMS: SearchParams = {
  [SearchParam.ORIGIN]: "Praha",
  [SearchParam.DESTINATION]: "Berlin",
  [SearchParam.DATE_FROM]: "22/07/2022",
  [SearchParam.DATE_TO]: "30/07/2022",
};

describe("SearchPageAPI", () => {
  describe("Reducer slices tests", () => {
    const initialState: ISearchPageApi =
      SearchPageApiSingleton.getInitialState();

    it("should return initial state", () => {
      expect(SearchPageApiReducer(undefined, { type: null })).toEqual(
        initialState
      );
    });

    it("should change origin phrase", () => {
      expect(
        SearchPageApiReducer(initialState, {
          type: SearchPageAPI.search.type,
          payload: true,
        }).isLoading
      ).toEqual(true);
    });

    it("should change loading state", () => {
      expect(
        SearchPageApiReducer(initialState, {
          type: SearchPageAPI.setIsLoading.type,
          payload: true,
        }).isLoading
      ).toEqual(true);
    });

    it("should set search results", () => {
      expect(
        SearchPageApiReducer(initialState, {
          type: SearchPageAPI.setSearchResults.type,
          payload: MOCK_FLIGHT_RESULTS,
        }).searchResults
      ).toEqual(MOCK_FLIGHT_RESULTS);
    });
  });

  describe("Action tests", () => {
    it("should create an search action", () => {
      const expectedAction = {
        type: `${SearchPageApiName}/search`,
        payload: MOCK_SEARCH_PARAMS,
      };
      expect(SearchPageAPI.search(MOCK_SEARCH_PARAMS)).toEqual(expectedAction);
    });

    it("should create an set loading action", () => {
      const expectedAction = {
        type: `${SearchPageApiName}/setIsLoading`,
        payload: true,
      };
      expect(SearchPageAPI.setIsLoading(true)).toEqual(expectedAction);
    });

    it("should create an set search results action", () => {
      const expectedAction = {
        type: `${SearchPageApiName}/setSearchResults`,
        payload: MOCK_FLIGHT_RESULTS,
      };
      expect(
        SearchPageAPI.setSearchResults(
          MOCK_FLIGHT_RESULTS as Array<FlightSearchResult>
        )
      ).toEqual(expectedAction);
    });
  });

  describe("Saga tests", () => {
    const generator = SearchPageApiSaga();
    it("should trigger on search", async () => {
      expect(generator.next().value).toEqual(
        takeEvery(
          SearchPageAPI.search.type,
          SearchPageApiSingleton.handleSearch
        )
      );
    });
  });

  describe("Selector tests", () => {
    const searchPageApiState: ISearchPageApi = {
      searchResults: MOCK_FLIGHT_RESULTS as Array<FlightSearchResult>,
      isLoading: false,
    };

    it("should return loading status", () => {
      expect(
        SearchPageApiSingleton.isLoadingSelector.resultFunc(searchPageApiState)
      ).toEqual(searchPageApiState.isLoading);
    });

    it("should return search results", () => {
      expect(
        SearchPageApiSingleton.searchResultsSelector.resultFunc(
          searchPageApiState
        )
      ).toEqual(searchPageApiState.searchResults);
    });
  });
});
