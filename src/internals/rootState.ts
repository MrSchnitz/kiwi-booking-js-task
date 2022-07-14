import { all } from "redux-saga/effects";
import {
  ISearchFormApi,
  SearchFormApiReducer,
  SearchFormApiSaga,
} from "../components/SearchForm/SearchFormAPI";
import {
  ISearchPageApi,
  SearchPageApiReducer,
  SearchPageApiSaga,
} from "../containers/SearchPage/SearchPageAPI";

export interface RootState {
  searchFormApiSlice: ISearchFormApi;
  searchPageApiSlice: ISearchPageApi;
}

export const mainReducers = {
  searchFormApiSlice: SearchFormApiReducer,
  searchPageApiSlice: SearchPageApiReducer,
};

export default function* rootSaga() {
  yield all([SearchFormApiSaga(), SearchPageApiSaga()]);
}
