import { render } from "@testing-library/react";
import PageLoader from "../PageLoader";

describe("PageLoader", () => {
  it("should render basic component", () => {
    const { container } = render(<PageLoader />);

    expect(container).toMatchSnapshot();
  });
});
