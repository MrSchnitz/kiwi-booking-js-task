import SearchFormApiSingleton, {
  ISearchFormApi,
  ISearchFormData,
  SearchFormAPI,
  SearchFormApiName,
  SearchFormApiReducer,
  SearchFormApiSaga,
  SearchParam,
} from "../SearchFormAPI";
import { FlightLocation } from "../../../types/FlightLocationTypes";
import { debounce, takeEvery } from "redux-saga/effects";

const MOCK_SEARCH_FORM_DATA: ISearchFormData = {
  [SearchParam.ORIGIN]: "Praha",
  [SearchParam.DESTINATION]: "Berlin",
  [SearchParam.DATE_FROM]: "22/07/2022",
  [SearchParam.DATE_TO]: "30/07/2022",
};

const MOCK_LOCATIONS: Array<Partial<FlightLocation>> = [
  { id: "prague" },
  { id: "berlin" },
];

describe("SearchFormAPI", () => {
  describe("Reducer slices tests", () => {
    const initialState: ISearchFormApi =
      SearchFormApiSingleton.getInitialState();

    it("should return initial state", () => {
      expect(SearchFormApiReducer(undefined, { type: null })).toEqual(
        initialState
      );
    });

    it("should change origin phrase", () => {
      const originPhrase = "Praha";

      expect(
        SearchFormApiReducer(initialState, {
          type: SearchFormAPI.changeOriginPhrase.type,
          payload: originPhrase,
        }).originSearchPhrase
      ).toEqual(originPhrase);
    });

    it("should change destination phrase", () => {
      const destinationPhrase = "Berlin";

      expect(
        SearchFormApiReducer(initialState, {
          type: SearchFormAPI.changeDestinationPhrase.type,
          payload: destinationPhrase,
        }).destinationSearchPhrase
      ).toEqual(destinationPhrase);
    });

    it("should load form data", () => {
      expect(
        SearchFormApiReducer(initialState, {
          type: SearchFormAPI.loadSearchFormData.type,
          payload: MOCK_SEARCH_FORM_DATA,
        })
      ).toEqual(SearchFormApiSingleton.getInitialState());
    });

    it("should set Locations", () => {
      expect(
        SearchFormApiReducer(initialState, {
          type: SearchFormAPI.setLocations.type,
          payload: MOCK_LOCATIONS,
        }).locations
      ).toEqual(MOCK_LOCATIONS);
    });

    it("should set search form data", () => {
      expect(
        SearchFormApiReducer(initialState, {
          type: SearchFormAPI.setSearchFormData.type,
          payload: MOCK_SEARCH_FORM_DATA,
        }).searchFormData
      ).toEqual(MOCK_SEARCH_FORM_DATA);
    });
  });

  describe("Action tests", () => {
    it("should create an action to change origin phrase", () => {
      const expectedAction = {
        type: `${SearchFormApiName}/changeOriginPhrase`,
        payload: "Praha",
      };
      expect(SearchFormAPI.changeOriginPhrase("Praha")).toEqual(expectedAction);
    });

    it("should create an action to change destination phrase", () => {
      const expectedAction = {
        type: `${SearchFormApiName}/changeDestinationPhrase`,
        payload: "Berlin",
      };
      expect(SearchFormAPI.changeDestinationPhrase("Berlin")).toEqual(
        expectedAction
      );
    });

    it("should create an action to load form data", () => {
      const expectedAction = {
        type: `${SearchFormApiName}/loadSearchFormData`,
        payload: MOCK_SEARCH_FORM_DATA,
      };
      expect(SearchFormAPI.loadSearchFormData(MOCK_SEARCH_FORM_DATA)).toEqual(
        expectedAction
      );
    });

    it("should create an action to set locations", () => {
      const expectedAction = {
        type: `${SearchFormApiName}/setLocations`,
        payload: MOCK_LOCATIONS,
      };
      expect(
        SearchFormAPI.setLocations(MOCK_LOCATIONS as Array<FlightLocation>)
      ).toEqual(expectedAction);
    });

    it("should create an action to set search form data", () => {
      const expectedAction = {
        type: `${SearchFormApiName}/setSearchFormData`,
        payload: MOCK_SEARCH_FORM_DATA,
      };
      expect(SearchFormAPI.setSearchFormData(MOCK_SEARCH_FORM_DATA)).toEqual(
        expectedAction
      );
    });
  });

  describe("Saga tests", () => {
    const generator = SearchFormApiSaga();
    it("should trigger on change origin or destination phrase", async () => {
      expect(generator.next().value).toEqual(
        debounce(
          500,
          [
            SearchFormAPI.changeOriginPhrase.type,
            SearchFormAPI.changeDestinationPhrase.type,
          ],
          SearchFormApiSingleton.handleSearch
        )
      );
    });

    it("should trigger on load search form data", async () => {
      expect(generator.next().value).toEqual(
        takeEvery(
          SearchFormAPI.loadSearchFormData.type,
          SearchFormApiSingleton.handleLoadSearchData
        )
      );
    });
  });

  describe("Selector tests", () => {
    const searchFormApiState: ISearchFormApi = {
      originSearchPhrase: "Praha",
      destinationSearchPhrase: "Berlin",
      locations: MOCK_LOCATIONS as Array<FlightLocation>,
      searchFormData: MOCK_SEARCH_FORM_DATA,
    };

    it("should return origin phrase", () => {
      expect(
        SearchFormApiSingleton.originSearchPhraseSelector.resultFunc(
          searchFormApiState
        )
      ).toEqual(searchFormApiState.originSearchPhrase);
    });

    it("should return destination phrase", () => {
      expect(
        SearchFormApiSingleton.destinationSearchPhraseSelector.resultFunc(
          searchFormApiState
        )
      ).toEqual(searchFormApiState.destinationSearchPhrase);
    });

    it("should return locations", () => {
      expect(
        SearchFormApiSingleton.locationsSelector.resultFunc(searchFormApiState)
      ).toEqual(searchFormApiState.locations);
    });

    it("should return search form data", () => {
      expect(
        SearchFormApiSingleton.searchFormDataSelector.resultFunc(
          searchFormApiState
        )
      ).toEqual(searchFormApiState.searchFormData);
    });
  });
});
