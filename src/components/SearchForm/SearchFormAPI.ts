import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, debounce, put, takeEvery } from "redux-saga/effects";
import { RootState } from "../../internals/rootState";
import { SagaIterator } from "redux-saga";
import {
  FlightLocation,
  FlightLocationsResponse,
} from "../../types/FlightLocationTypes";

export enum SearchParam {
  ORIGIN = "origin",
  DESTINATION = "destination",
  DATE_FROM = "dateFrom",
  DATE_TO = "dateTo",
}

export interface ISearchFormData {
  [SearchParam.ORIGIN]: string;
  [SearchParam.DESTINATION]: string;
  [SearchParam.DATE_FROM]: string;
  [SearchParam.DATE_TO]: string;
}

/**
 * API State interface
 */
export interface ISearchFormApi {
  originSearchPhrase: string;
  destinationSearchPhrase: string;
  locations: Array<FlightLocation>;
  searchFormData: ISearchFormData;
}

/**
 * API
 */
class SearchFormApi {
  private static instance: SearchFormApi;

  private constructor() {
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLoadSearchData = this.handleLoadSearchData.bind(this);
    this.saga = this.saga.bind(this);
  }

  public static getInstance(): SearchFormApi {
    if (SearchFormApi.instance) {
      return this.instance;
    }
    this.instance = new SearchFormApi();
    return this.instance;
  }

  /*
   * SLICE
   */
  public getInitialState(): ISearchFormApi {
    return {
      originSearchPhrase: "",
      destinationSearchPhrase: "",
      locations: [],
      searchFormData: {
        origin: "",
        destination: "",
        dateFrom: "",
        dateTo: "",
      },
    };
  }

  public slice = createSlice({
    name: "homePageApiSlice",
    initialState: this.getInitialState(),
    reducers: {
      changeOriginPhrase(state, action: PayloadAction<string>) {
        state.originSearchPhrase = action.payload;
      },
      changeDestinationPhrase(state, action: PayloadAction<string>) {
        state.destinationSearchPhrase = action.payload;
      },
      loadSearchFormData(_, action: PayloadAction<ISearchFormData>) {},
      setLocations(state, action: PayloadAction<Array<FlightLocation>>) {
        state.locations = action.payload;
      },
      setSearchFormData(state, action: PayloadAction<ISearchFormData>) {
        state.searchFormData = action.payload;
      },
    },
  });

  /*
   * SAGAS
   */
  public *handleSearch(action: PayloadAction<string>): SagaIterator {
    const response = yield call(
      fetch,
      `https://api.skypicker.com/locations?term=${action.payload}&location_types=airport`
    );
    const responseBody: FlightLocationsResponse = yield response.json();
    yield put(this.slice.actions.setLocations(responseBody.locations));
  }

  public *handleLoadSearchData({
    payload,
  }: PayloadAction<ISearchFormData>): Generator {
    const searchData: ISearchFormData = { ...payload };
    if (!!searchData[SearchParam.ORIGIN]) {
      const response = yield call(
        this.fetchLocationById,
        searchData[SearchParam.ORIGIN]
      );
      const location: FlightLocation = (response as FlightLocationsResponse)
        .locations[0];
      searchData[SearchParam.ORIGIN] = location.name;
    }
    if (!!searchData[SearchParam.DESTINATION]) {
      const response = yield call(
        this.fetchLocationById,
        searchData[SearchParam.DESTINATION]
      );
      const location: FlightLocation = (response as FlightLocationsResponse)
        .locations[0];
      searchData[SearchParam.DESTINATION] = location.name;
    }

    yield put(this.slice.actions.setSearchFormData(searchData));
  }

  private *fetchLocationById(locationId: string): SagaIterator {
    const response = yield call(
      fetch,
      `https://api.skypicker.com/locations?type=id&id=${locationId}`
    );
    return yield response.json();
  }

  /*
   * SAGA - MAIN
   */
  public *saga(): SagaIterator {
    const { changeOriginPhrase, changeDestinationPhrase, loadSearchFormData } =
      this.slice.actions;
    yield all([
      yield debounce(
        500,
        [changeOriginPhrase.type, changeDestinationPhrase.type],
        this.handleSearch
      ),
      yield takeEvery(loadSearchFormData.type, this.handleLoadSearchData),
    ]);
  }

  /*
   * SELECTORS
   */
  private selectDomain(state: RootState): ISearchFormApi {
    return state.searchFormApiSlice || this.getInitialState();
  }

  public originSearchPhraseSelector = createSelector(
    [this.selectDomain],
    (apiState) => apiState.originSearchPhrase
  );

  public destinationSearchPhraseSelector = createSelector(
    [this.selectDomain],
    (apiState) => apiState.destinationSearchPhrase
  );

  public locationsSelector = createSelector(
    [this.selectDomain],
    (apiState) => apiState.locations
  );

  public searchFormDataSelector = createSelector(
    [this.selectDomain],
    (apiState) => apiState.searchFormData
  );
}

export default SearchFormApi.getInstance();

export const {
  actions: SearchFormAPI,
  reducer: SearchFormApiReducer,
  name: SearchFormApiName,
} = SearchFormApi.getInstance().slice;

export const {
  originSearchPhraseSelector,
  destinationSearchPhraseSelector,
  locationsSelector,
  searchFormDataSelector,
  saga: SearchFormApiSaga,
} = SearchFormApi.getInstance();
