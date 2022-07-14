import { fireEvent, render } from "@testing-library/react";
import SearchAutoCompleteInput from "../SearchAutoCompleteInput";
import { ISearchFormData, SearchParam } from "../../SearchForm/SearchFormAPI";
import { MemoryRouter } from "react-router-dom";
import { City, FlightLocation } from "../../../types/FlightLocationTypes";

const MOCK_SEARCH_FORM_DATA: ISearchFormData = {
  [SearchParam.ORIGIN]: "Praha",
  [SearchParam.DESTINATION]: "Berlin",
  [SearchParam.DATE_FROM]: "22/07/2022",
  [SearchParam.DATE_TO]: "30/07/2022",
};

const MOCK_EMPTY_SEARCH_FORM_DATA: ISearchFormData = {
  [SearchParam.ORIGIN]: "",
  [SearchParam.DESTINATION]: "",
  [SearchParam.DATE_FROM]: "",
  [SearchParam.DATE_TO]: "",
};

const MOCK_LOCATIONS: Array<Partial<FlightLocation>> = [
  {
    id: "prague",
    name: "Praha",
    city: {
      name: "Praha letiste",
    } as City,
  },
  {
    id: "berlin",
    name: "Berlin",
    city: {
      name: "Berlin letiste",
    } as City,
  },
];

describe("SearchAutoCompleteInput", () => {
  it("should render basic component", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchAutoCompleteInput
          activeInput={null}
          locations={[]}
          searchFormData={MOCK_SEARCH_FORM_DATA}
          type={SearchParam.ORIGIN}
          value={""}
          onLocationInputChange={jest.fn()}
          onSelectLocation={jest.fn()}
          onSelectedCityButtonClick={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render popover when locations are not empty", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchAutoCompleteInput
          activeInput={SearchParam.ORIGIN}
          locations={MOCK_LOCATIONS as Array<FlightLocation>}
          searchFormData={MOCK_SEARCH_FORM_DATA}
          type={SearchParam.ORIGIN}
          value={""}
          onLocationInputChange={jest.fn()}
          onSelectLocation={jest.fn()}
          onSelectedCityButtonClick={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render with input value", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchAutoCompleteInput
          activeInput={null}
          locations={[]}
          searchFormData={MOCK_EMPTY_SEARCH_FORM_DATA}
          type={SearchParam.ORIGIN}
          value={"Praha"}
          onLocationInputChange={jest.fn()}
          onSelectLocation={jest.fn()}
          onSelectedCityButtonClick={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("should change location input value", () => {
    const MOCK_INPUT_VALUE = "Barcelona";
    const mockLocationInputChange = jest.fn();

    const { container } = render(
      <MemoryRouter>
        <SearchAutoCompleteInput
          activeInput={SearchParam.ORIGIN}
          locations={MOCK_LOCATIONS as Array<FlightLocation>}
          searchFormData={MOCK_EMPTY_SEARCH_FORM_DATA}
          type={SearchParam.ORIGIN}
          value={""}
          onLocationInputChange={mockLocationInputChange}
          onSelectLocation={jest.fn()}
          onSelectedCityButtonClick={jest.fn()}
        />
      </MemoryRouter>
    );

    const locationInput: HTMLInputElement | null = container.querySelector(
      "input:first-of-type"
    );

    if (locationInput) {
      fireEvent.change(locationInput, { target: { value: MOCK_INPUT_VALUE } });
    }

    expect(mockLocationInputChange).toHaveBeenCalledTimes(1);
    expect(mockLocationInputChange).toHaveBeenCalledWith(
      MOCK_INPUT_VALUE,
      SearchParam.ORIGIN
    );
  });

  it("should select location", () => {
    const mockSelectLocation = jest.fn();

    const { container } = render(
      <MemoryRouter>
        <SearchAutoCompleteInput
          activeInput={SearchParam.ORIGIN}
          locations={MOCK_LOCATIONS as Array<FlightLocation>}
          searchFormData={MOCK_EMPTY_SEARCH_FORM_DATA}
          type={SearchParam.ORIGIN}
          value={""}
          onLocationInputChange={jest.fn()}
          onSelectLocation={mockSelectLocation}
          onSelectedCityButtonClick={jest.fn()}
        />
      </MemoryRouter>
    );

    const locationTile: HTMLDivElement | undefined = Array.from(
      container.querySelectorAll("div")
    ).find((el) => el.textContent === MOCK_LOCATIONS[0].name);

    if (locationTile) {
      fireEvent.click(locationTile);
    }

    expect(mockSelectLocation).toHaveBeenCalledTimes(1);
    expect(mockSelectLocation).toHaveBeenCalledWith(MOCK_LOCATIONS[0].city);
  });

  it("should trigger selected city button click", () => {
    const mockSelectedCityButtonClick = jest.fn();

    const { container } = render(
      <MemoryRouter
        initialEntries={[
          {
            search: `${SearchParam.ORIGIN}=${
              MOCK_SEARCH_FORM_DATA[SearchParam.ORIGIN]
            }`,
          },
        ]}
      >
        <SearchAutoCompleteInput
          activeInput={SearchParam.ORIGIN}
          locations={MOCK_LOCATIONS as Array<FlightLocation>}
          searchFormData={MOCK_SEARCH_FORM_DATA}
          type={SearchParam.ORIGIN}
          value={""}
          onLocationInputChange={jest.fn()}
          onSelectLocation={jest.fn()}
          onSelectedCityButtonClick={mockSelectedCityButtonClick}
        />
      </MemoryRouter>
    );

    const locationButton: HTMLButtonElement | null = container.querySelector(
      "button:first-of-type"
    );

    if (locationButton) {
      fireEvent.click(locationButton);
    }

    expect(mockSelectedCityButtonClick).toHaveBeenCalledTimes(1);
    expect(mockSelectedCityButtonClick).toHaveBeenCalledWith(
      SearchParam.ORIGIN
    );
  });
});
