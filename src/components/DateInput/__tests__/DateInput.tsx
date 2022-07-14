import { render } from "@testing-library/react";
import DateInput from "../DateInput";
import { SearchParam } from "../../SearchForm/SearchFormAPI";

describe("DateInput", () => {
  it("should render basic component", () => {
    const { container } = render(
      <DateInput
        type={SearchParam.DATE_FROM}
        value={""}
        prefix={"From"}
        onChange={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should rerender on value change", () => {
    const { container, rerender } = render(
      <DateInput
        type={SearchParam.DATE_FROM}
        value={"22/07/2022"}
        prefix={"From"}
        onChange={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();

    rerender(
      <DateInput
        type={SearchParam.DATE_FROM}
        value={"30/08/2023"}
        prefix={"From"}
        onChange={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
