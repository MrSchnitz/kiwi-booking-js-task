import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NoMatchPage from "../NoMatchPage";

describe("NoMatchPage", () => {
  it("should render basic component", () => {
    const { container } = render(
      <MemoryRouter>
        <NoMatchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
