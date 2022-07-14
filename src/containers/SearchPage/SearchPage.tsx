import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoadingSelector,
  SearchPageAPI,
  searchResultsSelector,
} from "./SearchPageAPI";
import {
  SearchPageLayout,
  SearchPageResultsWrapper,
  SearchPageSearchFormWrapper,
} from "./SearchPage.styles";
import {
  Card,
  CardSection,
  Heading,
  Illustration,
  Itinerary,
  ItinerarySegment,
  ItinerarySegmentDetail,
  ItinerarySegmentStop,
  Layout,
  LayoutColumn,
  Skeleton,
  Stack,
} from "@kiwicom/orbit-components";
import dayjs from "dayjs";
import SearchForm from "../../components/SearchForm/SearchForm";
import {
  ISearchFormData,
  SearchParam,
} from "../../components/SearchForm/SearchFormAPI";
import { FlightSearchResult } from "../../types/FlightSearchResultTypes";

export type SearchParams = {
  [key in SearchParam]: string;
};

const NUMBER_OF_SKELETONS = 10;

const SearchPage = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchResults: Array<FlightSearchResult> = useSelector(
    searchResultsSelector
  );
  const isLoading: boolean = useSelector(isLoadingSelector);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (Object.values(params).filter(Boolean).length !== 4) {
      navigate("/");
    }

    dispatch(SearchPageAPI.search(params as SearchParams));
  }, []);

  const onSearch = useCallback(
    (searchData: ISearchFormData) => {
      dispatch(SearchPageAPI.search(searchData));
    },
    [dispatch]
  );

  return (
    <SearchPageLayout>
      <SearchPageSearchFormWrapper>
        <Layout type="MMB">
          <LayoutColumn>
            <SearchForm onSearch={onSearch} />
          </LayoutColumn>
        </Layout>
      </SearchPageSearchFormWrapper>
      <SearchPageResultsWrapper>
        <Layout type="MMB">
          <LayoutColumn>
            {isLoading ? (
              <Stack direction="column" align="center">
                {new Array(NUMBER_OF_SKELETONS).fill(0).map((_, index) => (
                  <Skeleton key={index} height={200} width="100%" />
                ))}
              </Stack>
            ) : !searchResults.length ? (
              <Stack
                flex={true}
                direction="column"
                align="center"
                justify="center"
              >
                <Illustration
                  name="NoResults"
                  size="large"
                  spaceAfter="medium"
                />
                <Heading type="displaySubtitle">Sorry, no results..</Heading>
              </Stack>
            ) : (
              <Stack
                direction="column"
                align="center"
                grow={false}
                shrink={false}
                basis="auto"
              >
                {searchResults.map((flight) => (
                  <Card key={flight.id}>
                    <CardSection>
                      <Stack flex={true} align="center" justify="center">
                        <Stack
                          flex={true}
                          justify="end"
                          grow={false}
                          shrink={true}
                        >
                          <Itinerary>
                            <ItinerarySegment
                              noElevation={true}
                              spaceAfter="small"
                            >
                              <ItinerarySegmentStop
                                city={flight.cityFrom}
                                station=""
                                date={dayjs
                                  .unix(flight.dTime)
                                  .format("ddd, DD.MM")}
                                time={dayjs.unix(flight.dTime).format("HH:mm")}
                              />
                              <ItinerarySegmentDetail
                                duration={flight.fly_duration}
                                summary=""
                              />
                              <ItinerarySegmentStop
                                city={flight.cityTo}
                                station=""
                                date={dayjs
                                  .unix(flight.aTime)
                                  .format("ddd, DD.MM")}
                                time={dayjs.unix(flight.aTime).format("HH:mm")}
                              />
                            </ItinerarySegment>
                          </Itinerary>
                        </Stack>
                        <Stack
                          flex={true}
                          justify="start"
                          align="center"
                          grow={false}
                          shrink={true}
                        >
                          <Heading type="title2">{flight.price} EUR</Heading>
                        </Stack>
                      </Stack>
                    </CardSection>
                  </Card>
                ))}
              </Stack>
            )}
          </LayoutColumn>
        </Layout>
      </SearchPageResultsWrapper>
    </SearchPageLayout>
  );
});

export default SearchPage;
