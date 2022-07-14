import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { RootState } from "../../internals/rootState";
import { SagaIterator } from "redux-saga";
import { SearchParams } from "./SearchPage";
import { FlightSearchResult } from "../../types/FlightSearchResultTypes";

export interface SearchFlightResponse {
  data: Array<FlightSearchResult>;
}

/**
 * API State interface
 */
export interface ISearchPageApi {
  searchResults: Array<FlightSearchResult>;
  isLoading: boolean;
}

/**
 * API
 */
class SearchPageApi {
  private static instance: SearchPageApi;

  private constructor() {
    this.handleSearch = this.handleSearch.bind(this);
    this.saga = this.saga.bind(this);
  }

  public static getInstance(): SearchPageApi {
    if (SearchPageApi.instance) {
      return this.instance;
    }
    this.instance = new SearchPageApi();
    return this.instance;
  }

  /*
   * SLICE
   */
  public getInitialState(): ISearchPageApi {
    return {
      searchResults: [],
      isLoading: false,
    };
  }

  public slice = createSlice({
    name: "searchPageApiSlice",
    initialState: this.getInitialState(),
    reducers: {
      search(state, action: PayloadAction<SearchParams>) {
        state.isLoading = true;
      },
      setIsLoading(state, action: PayloadAction<boolean>) {
        state.isLoading = action.payload;
      },
      setSearchResults(
        state,
        action: PayloadAction<Array<FlightSearchResult>>
      ) {
        state.searchResults = action.payload;
      },
    },
  });

  /*
   * SAGAS
   */
  public *handleSearch({
    payload: { origin, destination, dateFrom, dateTo },
  }: PayloadAction<SearchParams>): SagaIterator {
    const { setSearchResults, setIsLoading } = this.slice.actions;
    const response = yield call(
      fetch,
      `https://api.skypicker.com/flights?v=3&partner=skypicker&locale=en&flyFrom=${origin}&to=${destination}&dateFrom=${dateFrom}&dateTo=${dateFrom}&typeFlight=return&returnFrom=${dateTo}&returnTo=${dateTo}`
    );
    const responseBody: SearchFlightResponse = yield response.json();

    yield put(setIsLoading(false));
    yield put(setSearchResults(responseBody.data));
  }

  /*
   * SAGA - MAIN
   */
  public *saga(): SagaIterator {
    const { search } = this.slice.actions;
    yield all([yield takeEvery(search.type, this.handleSearch)]);
  }

  /*
   * SELECTORS
   */
  private selectDomain(state: RootState): ISearchPageApi {
    return state.searchPageApiSlice || this.getInitialState();
  }

  public searchResultsSelector = createSelector(
    [this.selectDomain],
    (apiState) => apiState.searchResults
  );

  public isLoadingSelector = createSelector(
    [this.selectDomain],
    (apiState) => apiState.isLoading
  );
}

export default SearchPageApi.getInstance();

export const {
  actions: SearchPageAPI,
  reducer: SearchPageApiReducer,
  name: SearchPageApiName,
} = SearchPageApi.getInstance().slice;

export const {
  searchResultsSelector,
  isLoadingSelector,
  saga: SearchPageApiSaga,
} = SearchPageApi.getInstance();
