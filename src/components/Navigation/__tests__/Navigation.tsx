import { act, fireEvent, render } from "@testing-library/react";
import {
  MemoryRouter,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import Navigation from "../Navigation";
import { createMemoryHistory } from "history";

describe("Navigation", () => {
  it("should render basic component", () => {
    const { container } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should route to default route", () => {
    const history = createMemoryHistory({
      initialEntries: [{ pathname: "/about" }],
    });

    const { container } = render(
      <HistoryRouter history={history}>
        <Navigation />
      </HistoryRouter>
    );

    const linkButton: HTMLAnchorElement | null =
      container.querySelector('a[href="/"]');
    if (linkButton) {
      fireEvent.click(linkButton);
    }

    expect(history.location.pathname).toEqual("/");
  });
});
