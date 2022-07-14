import { fireEvent, render } from "@testing-library/react";
import SearchForm from "../SearchForm";
import { Provider } from "react-redux";
import { configureAppStore } from "../../../internals/configureStore";
import {
  MemoryRouter,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { ISearchFormData, SearchParam } from "../SearchFormAPI";
import { createMemoryHistory } from "history";

describe("SearchFormUI", () => {
  const store = configureAppStore();

  it("should render basic component", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchForm />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should navigate on search page on search button click", () => {
    const SEARCH_STRING =
      "?origin=berlin_de&destination=barcelona_es&dateFrom=22%2F07%2F2022&dateTo=30%2F07%2F2022";
    const history = createMemoryHistory({
      initialEntries: [{ pathname: "/", search: SEARCH_STRING }],
    });

    const { getByRole } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchForm />
        </HistoryRouter>
      </Provider>
    );

    const button = getByRole("button", { name: /search/i });

    if (button) {
      fireEvent.click(button);
    }

    expect(history.location.pathname).toEqual("/search");
    expect(history.location.search).toEqual(SEARCH_STRING);
  });

  it("should call onSearch callback on search button click", () => {
    const SEARCH_STRING =
      "?origin=berlin_de&destination=barcelona_es&dateFrom=22%2F07%2F2022&dateTo=30%2F07%2F2022";
    const history = createMemoryHistory({
      initialEntries: [{ pathname: "/", search: SEARCH_STRING }],
    });
    const searchData: ISearchFormData = {
      [SearchParam.ORIGIN]: "berlin_de",
      [SearchParam.DESTINATION]: "barcelona_es",
      [SearchParam.DATE_FROM]: "22/07/2022",
      [SearchParam.DATE_TO]: "30/07/2022",
    };

    const mockOnSearch = jest.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchForm onSearch={mockOnSearch} />
        </HistoryRouter>
      </Provider>
    );

    const button = getByRole("button", { name: /search/i });

    if (button) {
      fireEvent.click(button);
    }

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith(searchData);
  });
});
