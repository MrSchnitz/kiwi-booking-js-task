import { render } from "@testing-library/react";
import LandingPage from "../LandingPage";
import { Provider } from "react-redux";
import { configureAppStore } from "../../../internals/configureStore";
import { MemoryRouter } from "react-router-dom";

describe("LandingPage", () => {
  const store = configureAppStore();

  it("should render basic component", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
