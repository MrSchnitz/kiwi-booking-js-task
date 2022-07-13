import React from "react";
import {
  LandingPageSearchForm,
  LandingPageWrapper,
} from "./LandingPage.styles";
import { Layout, LayoutColumn } from "@kiwicom/orbit-components";
import SearchForm from "../../components/SearchForm/SearchForm";

export default React.memo(function HomePage() {
  return (
    <LandingPageWrapper>
      <Layout type="MMB">
        <LayoutColumn>
          <LandingPageSearchForm>
            <SearchForm />
          </LandingPageSearchForm>
        </LayoutColumn>
      </Layout>
    </LandingPageWrapper>
  );
});
