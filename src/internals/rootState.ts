import { all } from "redux-saga/effects";
import {
  ISearchFormApi,
  SearchFormApiReducer,
  SearchFormApiSaga,
} from "../components/SearchForm/SearchFormAPI";

export interface RootState {
  searchFormApiSlice: ISearchFormApi;
}

export const mainReducers = {
  searchFormApiSlice: SearchFormApiReducer,
};

export default function* rootSaga() {
  yield all([SearchFormApiSaga()]);
}
