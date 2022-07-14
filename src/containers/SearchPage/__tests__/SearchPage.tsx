import { render } from "@testing-library/react";
import SearchPage from "../SearchPage";
import { Provider } from "react-redux";
import { configureAppStore } from "../../../internals/configureStore";
import { MemoryRouter } from "react-router-dom";
import { SearchPageApiName } from "../SearchPageAPI";

describe("SearchPage", () => {
  const store = configureAppStore();

  it("should render basic component", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render with loading state", () => {
    store.dispatch({
      type: `${SearchPageApiName}/setIsLoading`,
      payload: true,
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render without results", () => {
    store.dispatch({
      type: `${SearchPageApiName}/setSearchResults`,
      payload: [],
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
